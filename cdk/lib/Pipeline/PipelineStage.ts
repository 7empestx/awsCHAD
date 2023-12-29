import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { FrontendStack } from "../FrontendStack/FrontendStack";
import { S3Stack } from "../S3/S3Stack";

export class PipelineStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const s3Stack = new S3Stack(this, "S3Stack");

    new FrontendStack(this, "FrontendStack", {
      myBucket: s3Stack.myBucket,
      cloudfrontOAI: s3Stack.cloudfrontOAI,
    });
  }
}
