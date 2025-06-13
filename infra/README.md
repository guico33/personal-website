# Portfolio Contact Form Backend

This directory contains the AWS CDK infrastructure for the portfolio contact form backend, which includes:

- **AWS Lambda function** to handle form submissions
- **API Gateway** to provide HTTPS endpoint 
- **SES integration** for sending emails

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
2. **Node.js 18+** installed
3. **AWS CDK** installed globally: `npm install -g aws-cdk`
4. **SES Email Verification** (see setup steps below)

## Setup

### 1. Install Dependencies
```bash
cd infra
npm install
```

### 2. Configure Email Addresses

Choose one of these methods:

**Option A: Environment Variables**
```bash
export SENDER_EMAIL="noreply@yourdomain.com"
export RECEIVER_EMAIL="contact@yourdomain.com"
```

**Option B: Create .env file**
```bash
cp .env.example .env
# Edit .env with your email addresses
```

**Option C: CDK Context (one-time deployment)**
```bash
npx cdk deploy -c senderEmail=noreply@yourdomain.com -c receiverEmail=contact@yourdomain.com
```

### 3. Verify SES Email Addresses

Before deployment, you must verify both email addresses in AWS SES:

1. Go to [AWS SES Console](https://console.aws.amazon.com/ses/)
2. Choose **Verified identities** → **Create identity**
3. Verify both sender and receiver email addresses
4. Check your email and click verification links

**Note**: If your AWS account is in SES sandbox mode, you can only send emails to verified addresses.

## Deployment

### 1. Bootstrap CDK (first time only)
```bash
# Using production SSO profile
npm run bootstrap:prod

# Or manually
npx cdk bootstrap --profile prod
```

### 2. Deploy the Infrastructure
```bash
# Using production SSO profile (recommended)
npm run deploy:prod

# Or manually
npx cdk deploy --profile prod
```

### 3. Preview Changes (Optional)
```bash
# Check what will change before deploying
npm run diff:prod
```

### 3. Note the API Endpoint
After deployment, copy the `ContactFormApiUrl` from the output. You'll need this for the frontend.

Example output:
```
Outputs:
PortfolioInfraStack.ContactFormApiUrl = https://abc123.execute-api.us-east-1.amazonaws.com/prod/contact
```

## Frontend Integration

Update your frontend contact form to call the deployed API endpoint:

```javascript
const API_ENDPOINT = 'https://your-api-id.execute-api.region.amazonaws.com/prod/contact';

const response = await fetch(API_ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    message: formData.message
  })
});
```

## Testing

Test the contact form by:

1. Filling out the form on your website
2. Checking AWS CloudWatch logs for the Lambda function
3. Verifying email delivery to the receiver address

## Cost Optimization

This setup uses:
- **AWS Lambda**: Pay per request (very low cost for contact forms)
- **API Gateway**: Pay per API call
- **SES**: Pay per email sent (very low cost)

Expected monthly cost for a portfolio site: **< $1 USD**

## Security Features

- ✅ CORS configured for GitHub Pages domains
- ✅ Input validation and sanitization
- ✅ Rate limiting via API Gateway
- ✅ Secure SES email sending
- ✅ No sensitive data logging

## Troubleshooting

**Email not sending?**
1. Check SES email verification status
2. Verify AWS region (SES availability)
3. Check CloudWatch logs for Lambda errors
4. Ensure SES is out of sandbox mode for production

**CORS errors?**
1. Check that your domain is included in allowed origins
2. Verify API Gateway CORS configuration
3. Test with localhost first

**API Gateway errors?**
1. Check Lambda function logs in CloudWatch
2. Verify IAM permissions for SES
3. Test Lambda function directly in AWS console

## Cleanup

To remove all resources:
```bash
npx cdk destroy
```

**Warning**: This will permanently delete the Lambda function and API Gateway endpoint.

## Useful Commands

### Development
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests

### Production Deployment (with SSO)
* `npm run bootstrap:prod`  bootstrap CDK in production account (first-time only)
* `npm run deploy:prod`     deploy to production with SSO authentication
* `npm run diff:prod`       preview changes before deployment
* `npm run destroy:prod`    destroy the production stack (use with caution!)

### Manual CDK Commands
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template