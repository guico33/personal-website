#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../src/lib/infra-stack';
import { FrontendStack } from '../src/lib/frontend-stack';
import * as dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

const app = new cdk.App();

// Get configuration from environment variables or context
const senderEmail = app.node.tryGetContext('senderEmail') || process.env.SENDER_EMAIL;
const receiverEmail = app.node.tryGetContext('receiverEmail') || process.env.RECEIVER_EMAIL;
const certificateArn = app.node.tryGetContext('certificateArn') || process.env.CLOUDFRONT_CERTIFICATE_ARN;

// Validate required configuration
if (!senderEmail || !receiverEmail) {
  console.error('❌ CONFIGURATION ERROR:');
  console.error('SENDER_EMAIL and RECEIVER_EMAIL must be provided via environment variables or CDK context.');
  console.error('\nOptions:');
  console.error('1. Set environment variables: SENDER_EMAIL and RECEIVER_EMAIL');
  console.error('2. Use CDK context: npx cdk deploy -c senderEmail=... -c receiverEmail=...');
  console.error('3. Create a .env file in the infra/ directory (see .env.example)');
  process.exit(1);
}

if (!certificateArn) {
  console.error('❌ CONFIGURATION ERROR:');
  console.error('CLOUDFRONT_CERTIFICATE_ARN must be provided via environment variables or CDK context.');
  console.error('\nOptions:');
  console.error('1. Set environment variable: CLOUDFRONT_CERTIFICATE_ARN');
  console.error('2. Use CDK context: npx cdk deploy -c certificateArn=...');
  console.error('3. Add to .env file: CLOUDFRONT_CERTIFICATE_ARN=arn:aws:acm:...');
  process.exit(1);
}

// Backend infrastructure (contact form)
new InfraStack(app, 'PortfolioInfraStack', {
  // Use current AWS CLI configuration
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1'
  },
  
  // Pass email configuration
  senderEmail,
  receiverEmail,
  
  // Stack description and tags
  description: 'Portfolio contact form backend infrastructure',
  tags: {
    Project: 'Portfolio',
    Environment: 'Production',
    ManagedBy: 'CDK'
  }
});

// Frontend infrastructure (website hosting)
new FrontendStack(app, 'PortfolioFrontendStack', {
  // Use current AWS CLI configuration (eu-west-3 for S3 and CloudFront)
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION || 'eu-west-3'
  },
  
  // Domain configuration
  domainName: 'guillaume-cauchet.com',
  certificateArn: certificateArn,
  
  // Stack description and tags
  description: 'Portfolio website hosting infrastructure',
  tags: {
    Project: 'Portfolio',
    Environment: 'Production',
    ManagedBy: 'CDK'
  }
});