import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { join } from 'path';

export interface InfraStackProps extends cdk.StackProps {
  senderEmail?: string;
  receiverEmail?: string;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps = {}) {
    super(scope, id, props);

    // Environment variables with defaults
    const senderEmail = props.senderEmail || process.env.SENDER_EMAIL;
    const receiverEmail = props.receiverEmail || process.env.RECEIVER_EMAIL;

    if (!senderEmail || !receiverEmail) {
      throw new Error(
        'Both SENDER_EMAIL and RECEIVER_EMAIL must be provided either as props or environment variables.',
      );
    }

    // ========================================
    // CONTACT FORM BACKEND
    // ========================================

    // Lambda function for contact form handling
    const contactFunction = new lambda.Function(this, 'ContactFormFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(join(__dirname, '../lambda/contact-handler')),
      environment: {
        SENDER_EMAIL: senderEmail,
        RECEIVER_EMAIL: receiverEmail,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      description: 'Handles contact form submissions and sends emails via SES'
    });

    // Grant SES permissions to the Lambda function
    contactFunction.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ses:SendEmail', 'ses:SendRawEmail'],
        resources: ['*'], // Can be more restrictive if needed
        conditions: {
          StringEquals: {
            'ses:FromAddress': senderEmail,
          },
        },
      }),
    );

    // API Gateway for the contact form endpoint
    const api = new apigateway.RestApi(this, 'ContactFormApi', {
      restApiName: 'Portfolio Contact Form API',
      description: 'API for handling portfolio contact form submissions',
      defaultCorsPreflightOptions: {
        allowOrigins: ['https://*.github.io', 'http://localhost:*'], // GitHub Pages and local dev
        allowMethods: ['POST', 'OPTIONS'],
        allowHeaders: ['Content-Type'],
      },
      deployOptions: {
        stageName: 'prod',
      },
    });

    // Create /contact endpoint
    const contactResource = api.root.addResource('contact');

    // Add POST method for form submissions
    contactResource.addMethod('POST', new apigateway.LambdaIntegration(contactFunction), {
      methodResponses: [{ statusCode: '200' }, { statusCode: '400' }, { statusCode: '500' }],
    });

    // ========================================
    // ADDITIONAL SECURITY AND MONITORING
    // ========================================

    // Add rate limiting and monitoring (optional enhancements)
    // Note: GitHub Pages will host the frontend, so no S3/CloudFront needed

    // ========================================
    // OUTPUTS
    // ========================================

    // Output the API endpoint URL
    new cdk.CfnOutput(this, 'ContactFormApiUrl', {
      value: api.url + 'contact',
      description: 'Contact form API endpoint URL',
      exportName: 'ContactFormApiUrl',
    });

    // Output important setup instructions
    new cdk.CfnOutput(this, 'SetupInstructions', {
      value: `
SETUP STEPS:
1. Verify email addresses in SES console:
   - Sender: ${senderEmail}
   - Receiver: ${receiverEmail}
2. Update frontend to use API endpoint: ${api.url}contact
3. Deploy frontend to GitHub Pages
4. Test contact form end-to-end
      `,
      description: 'Post-deployment setup instructions',
    });
  }
}
