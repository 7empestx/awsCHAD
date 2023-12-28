import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APIGatewayStack } from "../APIGateway/APIGatewayStack";
import { CognitoStack } from "../Cognito/CognitoStack";
import { LambdaStack } from "../Lambda/LambdaStack";
import { FrontendStack } from "../FrontendStack/FrontendStack";

export class PipelineStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new FrontendStack(this, "FrontendStack");

    new LambdaStack(this, "LambdaStack");
    new APIGatewayStack(this, "APIGatewayStack");
    new CognitoStack(this, "CognitoStack");

  }
}
