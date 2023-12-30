# **awsChad**

Looking to dominate the AWS landscape with the prowess of an "alpha"? Meet awsChad — a powerhouse starter kit designed to flex the full potential of cloud infrastructure.

## **Frontend**:

**React with Webpack**: Eschew the pedestrian HTML templates and embrace the React framework, fused with the might of Webpack bundling. Deployed from the robust storage of AWS S3 and accelerated by the swift delivery of AWS Cloudfront, this setup is your gateway to unleashing the apex of frontend performance.

## **Backend**:

**TypeScript AWS Lambda**: Cast aside the common tongues of Python and JavaScript. The enlightened know that TypeScript's type safety and sleek syntax are the hallmarks of cloud function warriors in the AWS Lambda arena. With an API Gateway honed to a razor's edge, it beckons TypeScript Lambdas with the urgency of a Chad vying for the last gym bench on Monday.

## Prerequisites:
- **Git**: Version control that packs a punch.
- **npm**: Your trusty sidekick for managing packages.

## Getting Started:
- **Fork**: Begin by forking this repository into your own GitHub domain.
- **Clone**: Pull your forked repository into your local environment for development prowess.

## Deployment Guide for awsChad:

Ensure these prerequisites are in place before you commence deployment:

1. **Domain Registration**:
   - Secure your domain through Amazon Route 53. Consult the [Route 53 Domain Registration Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html) for steps on domain conquest.

2. **Environment Configuration**:
   - Craft a `.env` file and place it within the `cdk` stronghold of your project. It should declare:
     ```
     DOMAIN_NAME="YourChosenRoute53Domain.com"
     ```
     Replace `YourChosenRoute53Domain.com` with your domain to assert its presence.

3. **CodeCommit Repository**:
   - Establish a repository named `awsChad` in the `us-east-1` territory of AWS. Deviate only if you dare, but remember to realign your pipeline stack's compass accordingly.
   - March the contents of your forked awsChad repository into this newly minted CodeCommit repository.

## Harnessing the CDK:

**Before you command the CDK, ensure your AWS credentials and IAM policies are battle-ready.**

1. **Bootstrap Your AWS Environment**:
   Initiate your campaign with `cdk bootstrap`, laying the groundwork in AWS for your CDK application's siege.

2. **Deploy Your Application**:
   Post-bootstrap, marshal your stacks into AWS with `cdk deploy --all`. Verify that your AWS credentials are set and your IAM policies are appropriately armed for the deployment.

---
