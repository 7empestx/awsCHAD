import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cloudfront as cloudfront, aws_s3 as s3 } from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";

export class CloudfrontStack extends cdk.Stack {
  public readonly distribution: cloudfront.CloudFrontWebDistribution;

  constructor(
    scope: Construct,
    id: string,
    bucket: s3.Bucket,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "intellismiledental.com",
    });

    const siteCertificate = new acm.DnsValidatedCertificate(
      this,
      "SiteCertificate",
      {
        domainName: "intellismiledental.com",
        hostedZone: hostedZone,
        region: "us-east-1",
      },
    );

    this.distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "CloudFront",
      {
        originConfigs: [
          {
            behaviors: [{ isDefaultBehavior: true }],
            customOriginSource: {
              domainName: bucket.bucketWebsiteDomainName,
            },
          },
        ],
        viewerCertificate:
          cloudfront.ViewerCertificate.fromAcmCertificate(siteCertificate),
      },
    );
  }
}
