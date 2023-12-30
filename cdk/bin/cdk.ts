import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/Pipeline/PipelineStack";

const app = new cdk.App();

const accountId = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION;

console.log(`Account ID: ${accountId}`);
console.log(`Region: ${region}`);

if (!accountId || !region) {
  throw new Error("Account ID and Region must be specified in the context.");
}

new PipelineStack(app, "PipelineStack", {
  env: {
    account: accountId,
    region: region,
  },
});

app.synth();
