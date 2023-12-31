import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_route53 as route53,
  aws_route53_targets as targets,
} from "aws-cdk-lib";
import * as deploy from "aws-cdk-lib/aws-s3-deployment";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";

require('dotenv').config();

interface FrontendStackProps extends cdk.StackProps {
  myBucket: s3.Bucket;
  cloudfrontOAI: cloudfront.OriginAccessIdentity;
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props);

    // Create the ACM certificate
    const domainName = process.env.DOMAIN_NAME;

    if (!domainName) {
      throw new Error("DOMAIN_NAME environment variable is required");
    }
    console.log("domainName: ", domainName);

    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: domainName,
    });

    const siteCertificate = new acm.Certificate(this, "SiteCertificate", {
      domainName: domainName,
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    new cdk.CfnOutput(this, "Certificate", {
      value: siteCertificate.certificateArn,
    });

    // Create the CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "CloudFront", {
      certificate: siteCertificate,
      defaultRootObject: "index.html",
      domainNames: [domainName],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: cdk.Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(props.myBucket, {
          originAccessIdentity: props.cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });

    // Create Route 53 record
    new route53.ARecord(this, "AliasRecord", {
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution),
      ),
      zone: hostedZone,
    });

    // Deploy website assets to the bucket
    new deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [deploy.Source.asset("../react-frontend/public")],
      destinationBucket: props.myBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
