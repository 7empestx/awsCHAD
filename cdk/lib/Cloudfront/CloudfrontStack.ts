import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_cloudfront as cloudfront, aws_s3 as s3 } from 'aws-cdk-lib';

export class CloudfrontStack extends cdk.Stack {
  constructor(scope: Construct, id: string, bucket: s3.Bucket, props?: cdk.StackProps) {
    super(scope, id, props);

    new cloudfront.CloudFrontWebDistribution(this, 'CloudFront', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    });
  }
}
