
# **awsChad**

## **Chad**:

So you want to harness the power of the ultimate "alpha male" in the AWS realm? Enter awsChad—a kickstart repo so ripped, it scoffs at the mere mention of average stacks.

## **Frontend**:

**React with Webpack:** Forget those basic HTML templates. Real Chads craft their frontends using React and bundle their masterpieces with Webpack. Hosted straight from AWS S3's iron-clad gym and distributed with AWS Cloudfront's lightning-fast reflexes, this stack is the key to unlocking your frontend beast mode.

## **Backend**:

**TypeScript AWS Lambda:** Python and JavaScript? Too mainstream. Real Chads know that TypeScript brings the type safety and modern syntax that separates the men from the boys in the AWS Lambda dojo. Our API Gateway is so sharp, it triggers TypeScript functions like a Chad spotting the last protein shake on the shelf.

## Guide to Using AWS CDK:

**Before proceeding with AWS CDK operations, ensure your AWS credentials and IAM policies are properly configured.**

1. **Bootstrap Your AWS Environment**:
   Begin by initializing a bootstrap process. Use the command `cdk bootstrap` to prepare your AWS environment. This step sets up the necessary resources in AWS to support the deployment of your CDK application.

2. **Deploy Your Application**:
   Once bootstrapping is complete, deploy your CDK stacks to your AWS account with the command `cdk deploy --all`. Confirm that your AWS credentials are correctly configured and that your IAM policies provide the required permissions for deploying the resources.

---

Occasionally, you might need to synthesize your stack, especially after making code modifications. Given that this CDK project requires specific command-line arguments for its configuration, the synthesis command should be formatted as follows: `cdk synth -c accountId=123456789012 -c region=us-east-1 -c domainName=google.com`. Please note that this package may function exclusively in the `us-east-1` region due to the placement of the domain's ACM certificate in that particular region.
