import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_s3 as s3, aws_cloudfront as cloudfront } from "aws-cdk-lib";
import * as deploy from "aws-cdk-lib/aws-s3-deployment";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import * as iam from "aws-cdk-lib/aws-iam";

export class S3Stack extends cdk.Stack {
  public readonly myBucket: s3.Bucket;
  public readonly cloudfrontOAI: cloudfront.OriginAccessIdentity;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Instantiate the CloudFront Origin Access Identity first
    this.cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "cloudfront-OAI",
      {
        comment: `OAI for awsChad`,
      },
    );

    this.myBucket = new s3.Bucket(this, "awsChadBucket", {
      bucketName: "awschadbucket",
      versioned: true,
      websiteIndexDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      publicReadAccess: true,
    });

    // Add a bucket policy
    this.myBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [this.myBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            this.cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId,
          ),
        ],
      }),
    );

    new deploy.BucketDeployment(this, "DeployWebsite", {
      destinationBucket: this.myBucket,
      sources: [deploy.Source.asset("../react-frontend/public")],
    });
  }
}
