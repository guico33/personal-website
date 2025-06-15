import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface FrontendStackProps extends cdk.StackProps {
  domainName: string;
  certificateArn?: string;
}

export class FrontendStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    const { domainName, certificateArn } = props;

    // ========================================
    // S3 BUCKET FOR STATIC WEBSITE
    // ========================================

    // S3 bucket to host the static website
    this.bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `${domainName}-website-${this.account}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html', // SPA routing
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For development
      autoDeleteObjects: true, // For development
    });

    // ========================================
    // ACM CERTIFICATE
    // ========================================

    let certificate: acm.ICertificate;

    if (certificateArn) {
      // Use existing certificate
      certificate = acm.Certificate.fromCertificateArn(
        this,
        'Certificate',
        certificateArn
      );
    } else {
      // Create new certificate (requires manual DNS validation)
      certificate = new acm.Certificate(this, 'Certificate', {
        domainName: domainName,
        subjectAlternativeNames: [`www.${domainName}`],
        validation: acm.CertificateValidation.fromDns(),
      });
    }

    // ========================================
    // CLOUDFRONT DISTRIBUTION
    // ========================================

    // Origin Access Control for S3
    const originAccessControl = new cloudfront.S3OriginAccessControl(
      this,
      'OriginAccessControl',
      {
        description: `OAC for ${domainName}`,
      }
    );

    // CloudFront distribution
    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket, {
          originAccessControl,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      domainNames: [domainName, `www.${domainName}`],
      certificate: certificate,
      // minimumProtocolVersion: defaults to latest secure version
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      comment: `CloudFront distribution for ${domainName}`,
    });

    // Grant CloudFront access to S3 bucket
    this.bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'AllowCloudFrontServicePrincipal',
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        actions: ['s3:GetObject'],
        resources: [this.bucket.arnForObjects('*')],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${this.distribution.distributionId}`,
          },
        },
      })
    );

    // ========================================
    // OUTPUTS
    // ========================================

    new cdk.CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
      description: 'S3 bucket name for website hosting',
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront distribution ID',
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.distribution.distributionDomainName,
      description: 'CloudFront distribution domain name',
    });

    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: `https://${domainName}`,
      description: 'Website URL',
    });

    new cdk.CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn,
      description: 'ACM certificate ARN',
    });

    // DNS setup instructions
    new cdk.CfnOutput(this, 'DNSSetupInstructions', {
      value: `
DNS SETUP REQUIRED:
1. In Route53 (management account), create ALIAS records:
   - ${domainName} → ${this.distribution.distributionDomainName}
   - www.${domainName} → ${this.distribution.distributionDomainName}
2. If certificate was created, validate it via DNS records
3. Test website at https://${domainName}
      `,
      description: 'DNS setup instructions',
    });
  }
}