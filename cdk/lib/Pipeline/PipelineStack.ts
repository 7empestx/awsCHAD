import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import { PipelineStage } from "./PipelineStage";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(
      this,
      "awsChad",
      "awsChad",
    );

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "awsChad",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.codeCommit(repository, "main"),
        commands: ["cd cdk", "npm install typescript", "npx cdk synth"],
        primaryOutputDirectory: "cdk/cdk.out",
      }),
    });

    pipeline.addStage(
      new PipelineStage(this, "Alpha", {
        env: { account: "659946347679", region: "us-east-1" },
      }),
    );
  }
}
