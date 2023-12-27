import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cloudfront as cloudfront, aws_s3 as s3 } from "aws-cdk-lib";

export class CloudfrontStack extends cdk.Stack {
  public readonly distribution: cloudfront.CloudFrontWebDistribution;

  constructor(
    scope: Construct,
    id: string,
    bucket: s3.Bucket,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    this.distribution = new cloudfront.CloudFrontWebDistribution(this, "CloudFront", {
      originConfigs: [

      ]
    });
  }
}
