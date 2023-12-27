import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";

export interface Route53StackProps extends cdk.StackProps {
  distribution: cloudfront.CloudFrontWebDistribution;
}

export class Route53Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Route53StackProps) {
    super(scope, id, props);

    // Perform the lookup within the stack constructor
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'intellismiledental.com',
    });

    // Use the looked-up hosted zone for creating records
    new route53.ARecord(this, 'AliasRecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(props.distribution)),
      recordName: 'intellismiledental.com',
    });
  }
}
