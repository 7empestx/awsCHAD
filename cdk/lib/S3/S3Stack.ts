import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cloudfront as cloudfront, aws_s3 as s3 } from "aws-cdk-lib";
import * as deploy from "aws-cdk-lib/aws-s3-deployment";

export class S3Stack extends cdk.Stack {
  public readonly myBucket: s3.Bucket;
  readonly distribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.myBucket = new s3.Bucket(this, "IntelliSmileDentalBucket", {
      bucketName: "intellismiledentalbucket",
      versioned: true,
      websiteIndexDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: true,
    });

    new deploy.BucketDeployment(this, "DeployWebsite", {
      destinationBucket: this.myBucket,
      sources: [deploy.Source.asset("../react-frontend/public")],
    });
  }
}
