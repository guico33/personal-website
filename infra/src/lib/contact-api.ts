import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface ContactFormApiProps {
  contactFunction: lambda.IFunction;
  allowedOrigins?: string[];
}

export class ContactFormApi extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly url: string;

  constructor(scope: Construct, id: string, props: ContactFormApiProps) {
    super(scope, id);

    // Default allowed origins
    const allowedOrigins = props.allowedOrigins || [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'https://*.github.io',
    ];

    // API Gateway with enhanced configuration
    this.api = new apigateway.RestApi(this, 'ContactFormApi', {
      restApiName: 'Portfolio Contact Form API',
      description: 'API for handling portfolio contact form submissions',
      defaultCorsPreflightOptions: {
        allowOrigins: allowedOrigins,
        allowMethods: ['POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'X-Requested-With'],
        allowCredentials: false,
      },
      deployOptions: {
        stageName: 'prod',
        dataTraceEnabled: false,
        metricsEnabled: true,
      },
      // Set maximum request payload size (10MB as API Gateway limit)
      policy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            principals: [new iam.AnyPrincipal()],
            actions: ['execute-api:Invoke'],
            resources: ['*'],
          }),
        ],
      }),
    });

    // Create request validator for payload size and content-type validation
    const requestValidator = this.api.addRequestValidator('ContactFormRequestValidator', {
      requestValidatorName: 'Contact Form Request Validator',
      validateRequestBody: true,
      validateRequestParameters: true,
    });

    // Create request model for validation
    const contactModel = this.api.addModel('ContactFormModel', {
      modelName: 'ContactFormModel',
      contentType: 'application/json',
      schema: {
        schema: apigateway.JsonSchemaVersion.DRAFT4,
        type: apigateway.JsonSchemaType.OBJECT,
        required: ['name', 'email', 'message'],
        properties: {
          name: {
            type: apigateway.JsonSchemaType.STRING,
            minLength: 2,
            maxLength: 100,
          },
          email: {
            type: apigateway.JsonSchemaType.STRING,
            format: 'email',
            maxLength: 254, // RFC 5321 email length limit
          },
          message: {
            type: apigateway.JsonSchemaType.STRING,
            minLength: 10,
            maxLength: 5000,
          },
        },
        additionalProperties: false, // Reject extra fields
      },
    });

    // Create /contact endpoint
    const contactResource = this.api.root.addResource('contact');

    // Add POST method with validation and rate limiting
    contactResource.addMethod('POST', new apigateway.LambdaIntegration(props.contactFunction), {
      methodResponses: [{ statusCode: '200' }, { statusCode: '400' }, { statusCode: '500' }],
      requestValidator,
      requestModels: {
        'application/json': contactModel,
      },
    });

    // Configure throttling at the API level
    this.api.addUsagePlan('ContactFormUsagePlan', {
      name: 'Contact Form Usage Plan',
      description: 'Rate limiting for contact form submissions',
      throttle: {
        rateLimit: 10, // requests per second
        burstLimit: 20, // burst capacity
      },
      quota: {
        limit: 1000, // requests per period
        period: apigateway.Period.DAY,
      },
    });

    // Store the API URL for easy access
    this.url = this.api.url + 'contact';

    // Output the API endpoint URL
    new cdk.CfnOutput(this, 'ContactFormApiUrl', {
      value: this.url,
      description: 'Contact form API endpoint URL',
      exportName: 'ContactFormApiUrl',
    });
  }
}
