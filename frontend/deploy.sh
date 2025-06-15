#!/bin/bash

# Frontend deployment script for guillaume-cauchet.com
# This script builds the React app and deploys it to S3 + CloudFront

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN_NAME="guillaume-cauchet.com"
STACK_NAME="PortfolioFrontendStack"
REGION="eu-west-3"

echo -e "${BLUE}🚀 Starting deployment for ${DOMAIN_NAME}${NC}"

# Step 1: Build the React application
echo -e "${YELLOW}📦 Building React application...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"

# Step 2: Get S3 bucket name and CloudFront distribution ID from CDK outputs
echo -e "${YELLOW}🔍 Getting deployment information from CDK...${NC}"

# Get bucket name
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --profile prod \
    --query 'Stacks[0].Outputs[?OutputKey==`BucketName`].OutputValue' \
    --output text 2>/dev/null)

# Get distribution ID
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --profile prod \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text 2>/dev/null)

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo -e "${RED}❌ Could not retrieve deployment information from CloudFormation${NC}"
    echo -e "${YELLOW}💡 Make sure the CDK stack is deployed: npm run deploy --prefix ../infra${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Found S3 bucket: ${BUCKET_NAME}${NC}"
echo -e "${GREEN}✅ Found CloudFront distribution: ${DISTRIBUTION_ID}${NC}"

# Step 3: Upload files to S3
echo -e "${YELLOW}☁️  Uploading files to S3...${NC}"

# Sync files to S3 with proper cache headers
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --delete \
    --profile prod \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML files with shorter cache (they change more frequently)
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --delete \
    --profile prod \
    --cache-control "public, max-age=300" \
    --exclude "*" \
    --include "*.html" \
    --include "*.json"

echo -e "${GREEN}✅ Files uploaded to S3${NC}"

# Step 4: Invalidate CloudFront cache
echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"

INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --profile prod \
    --query 'Invalidation.Id' \
    --output text)

echo -e "${GREEN}✅ CloudFront invalidation created: ${INVALIDATION_ID}${NC}"

# Step 5: Wait for invalidation to complete (optional)
echo -e "${YELLOW}⏳ Waiting for invalidation to complete...${NC}"

aws cloudfront wait invalidation-completed \
    --distribution-id $DISTRIBUTION_ID \
    --id $INVALIDATION_ID \
    --profile prod

echo -e "${GREEN}✅ CloudFront invalidation completed${NC}"

# Final success message
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}🌐 Website URL: https://${DOMAIN_NAME}${NC}"
echo -e "${BLUE}📊 CloudFront Distribution: https://console.aws.amazon.com/cloudfront/v3/home?region=${REGION}#/distributions/${DISTRIBUTION_ID}${NC}"

# Optional: Open website in browser (uncomment if desired)
# open "https://${DOMAIN_NAME}"