import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/Pipeline/PipelineStack";

const app = new cdk.App();

new PipelineStack(app, "PipelineStack", {
  env: {
    account: "659946347679",
    region: "us-west-2",
  },
});

app.synth();
