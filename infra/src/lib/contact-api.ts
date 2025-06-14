import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
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
        // Enable request/response logging
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: false, // Don't log sensitive data
        metricsEnabled: true,
      },
    });

    // Create /contact endpoint
    const contactResource = this.api.root.addResource('contact');

    // Add POST method
    contactResource.addMethod('POST', new apigateway.LambdaIntegration(props.contactFunction), {
      methodResponses: [{ statusCode: '200' }, { statusCode: '400' }, { statusCode: '500' }],
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
