import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_s3 as s3 } from "aws-cdk-lib";

export class S3Stack extends cdk.Stack {
  public readonly myBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.myBucket = new s3.Bucket(this, "S3StackBucket", {
      versioned: true,
    });
  }
}
