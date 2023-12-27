import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APIGatewayStack } from "../APIGateway/APIGatewayStack";
import { CloudfrontStack } from "../Cloudfront/CloudfrontStack";
import { CognitoStack } from "../Cognito/CognitoStack";
import { LambdaStack } from "../Lambda/LambdaStack";
import { S3Stack } from "../S3/S3Stack";
import { Route53Stack } from "../Route53/Route53Stack";
import * as route53 from 'aws-cdk-lib/aws-route53';

export class PipelineStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const s3Stack = new S3Stack(this, "S3Stack");
    new LambdaStack(this, "LambdaStack");
    new APIGatewayStack(this, "APIGatewayStack");
    new CognitoStack(this, "CognitoStack");

    // Now pass the hosted zone when creating the CloudfrontStack
    const cloudfrontStack = new CloudfrontStack(this, "CloudfrontStack", s3Stack.myBucket);

    // Then, pass the CloudFront distribution to the Route53Stack
    new Route53Stack(this, "Route53Stack", {
      distribution: cloudfrontStack.distribution,
    });
  }
}
