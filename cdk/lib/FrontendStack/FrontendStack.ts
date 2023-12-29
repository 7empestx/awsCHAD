import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_s3 as s3, aws_cloudfront as cloudfront, aws_route53 as route53, aws_route53_targets as targets } from "aws-cdk-lib";
import * as deploy from "aws-cdk-lib/aws-s3-deployment";
import { PolicyStatement, Effect, StarPrincipal } from "aws-cdk-lib/aws-iam";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the S3 bucket
    const myBucket = new s3.Bucket(this, "IntelliSmileDentalBucket", {
      bucketName: "intellismiledentalbucket",
      versioned: true,
      websiteIndexDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Add a bucket policy
    myBucket.addToResourcePolicy(
      new PolicyStatement({
        actions: ["s3:GetObject"],
        effect: Effect.ALLOW,
        principals: [new StarPrincipal()],
        resources: [myBucket.arnForObjects("*")],
      }),
    );

    // Create the ACM certificate
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "intellismiledental.com",
    });

    const siteCertificate = new acm.Certificate(this, "SiteCertificate", {
      domainName: "intellismiledental.com",
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    // Create the CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, "CloudFront", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: myBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(siteCertificate, {
        aliases: ["intellismiledental.com"],
      }),
    });

    // Deploy website assets to the bucket
    new deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [deploy.Source.asset("../react-frontend/public")],
      destinationBucket: myBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    // Create Route 53 record
    new route53.ARecord(this, "AliasRecord", {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      recordName: "intellismiledental.com",
    });
  }
}

