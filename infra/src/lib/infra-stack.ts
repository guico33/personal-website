import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { join } from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { ContactFormApi } from './api-gateway-construct';

export interface InfraStackProps extends cdk.StackProps {
  senderEmail: string;
  receiverEmail: string;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
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
    const contactFunction = new NodejsFunction(this, 'ContactFormFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: join(__dirname, '../lambda/contact-handler/index.ts'),
      handler: 'handler',
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2022',
      },
      environment: {
        SENDER_EMAIL: senderEmail,
        RECEIVER_EMAIL: receiverEmail,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
      description: 'Handles contact form submissions and sends emails via SES',
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
    const contactFormApi = new ContactFormApi(this, 'ContactFormApi', {
      contactFunction,
    });

    // ========================================
    // ADDITIONAL SECURITY AND MONITORING
    // ========================================

    // Add rate limiting and monitoring (optional enhancements)
    // Note: GitHub Pages will host the frontend, so no S3/CloudFront needed

    // ========================================
    // OUTPUTS
    // ========================================

    // Output important setup instructions
    new cdk.CfnOutput(this, 'SetupInstructions', {
      value: `
SETUP STEPS:
1. Verify email addresses in SES console:
   - Sender: ${senderEmail}
   - Receiver: ${receiverEmail}
2. Update frontend to use API endpoint: ${contactFormApi.url}
3. Deploy frontend to GitHub Pages
4. Test contact form end-to-end
      `,
      description: 'Post-deployment setup instructions',
    });
  }
}
