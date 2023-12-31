# **awsChad**

Looking to dominate the AWS landscape with the prowess of an "alpha"? Meet awsChad — a powerhouse starter kit designed to flex the full potential of cloud infrastructure.

## **Frontend**:

**React with Webpack**: Eschew the pedestrian HTML templates and embrace the React framework, fused with the might of Webpack bundling. Deployed from the robust storage of AWS S3 and accelerated by the swift delivery of AWS Cloudfront, this setup is your gateway to unleashing the apex of frontend performance.

## **Backend**:

**TypeScript AWS Lambda**: Cast aside the common tongues of Python and JavaScript. The enlightened know that TypeScript's type safety and sleek syntax are the hallmarks of cloud function warriors in the AWS Lambda arena. With an API Gateway honed to a razor's edge, it beckons TypeScript Lambdas with the urgency of a Chad vying for the last gym bench on Monday.

## Prerequisites:
- **Git**: Version control that packs a punch.
- **npm**: Your trusty sidekick for managing packages.
- **aws-cli**

## Getting Started:
- **Fork**: Begin by forking this repository into your own GitHub domain.
- **Clone**: Pull your forked repository into your local environment for development prowess.

---

## awsChad Deployment Guide:

This guide outlines the steps required for the seamless deployment of the awsChad project. Follow these prerequisites to prepare your environment:

1. **IAM User Configuration**:
   - Create an IAM user and generate access keys for CLI operations.
   - Attach the following policy to the user, ensuring to replace `<account-number>` with your actual AWS account number:
     ```json
     {
         "Version": "2012-10-17",
         "Statement": [
             {
                 "Sid": "CDKBootstrap",
                 "Effect": "Allow",
                 "Action": [
                     "cloudformation:*",
                     "ecr:*",
                     "iam:DeleteRolePolicy",
                     "iam:GetRole",
                     "iam:CreateRole",
                     "iam:AttachRolePolicy",
                     "iam:PutRolePolicy",
                     "iam:DetachRolePolicy",
                     "iam:DeleteRole",
                     "iam:PassRole",
                     "ssm:*",
                     "s3:*"
                 ],
                 "Resource": [
                     "arn:aws:iam::<account-number>:*",
                     "arn:aws:cloudformation:us-east-1:<account-number>:*",
                     "arn:aws:ssm:us-east-1:<account-number>:*",
                     "arn:aws:ecr:us-east-1:<account-number>:*",
                     "arn:aws:s3:::*"
                 ]
             }
         ]
     }
     ```
     This policy facilitates the `cdk bootstrap` command. Exercise caution as this policy is expansive; tailor it to your project's security needs. Safeguard your access keys and never commit them to any repositories.
   - Generate HTTPS Git credentials for AWS CodeCommit and attach the `AWSCodeCommitPowerUser` policy to your IAM user for repository access.

2. **AWS CLI Installation**:
   - Follow the [AWS CLI Installation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) documentation to install the AWS CLI.
   - Run `aws configure` to set up your IAM user's credentials in the CLI environment.

3. **Domain Registration**:
   - Register a domain with Amazon Route 53, referring to the [Route 53 Domain Registration Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html) for comprehensive guidance.

4. **Local Environment Setup**:
   - Inside the `cdk` directory of your project, create a `.env` file and specify your Route 53 domain:
     ```
     DOMAIN_NAME="YourChosenRoute53Domain.com"
     ```
     Replace `YourChosenRoute53Domain.com` with the domain you've registered, which will be integral to your deployment.

5. **CodeCommit Repository Setup**:
   - In the `us-east-1` region, establish a CodeCommit repository named `awsChad`. Should you opt for a different name or region, realign your pipeline stack's configurations accordingly.
   - Link the CodeCommit repository as a remote to your local repository and push your awsChad project using the HTTPS Git credentials established earlier.
--- 

Following this structured approach will help ensure that all necessary configurations and security precautions are in place for deploying your awsChad project.

## Harnessing the CDK:

**Before you command the CDK, ensure your AWS credentials and IAM policies are battle-ready.**

1. **Bootstrap Your AWS Environment**:
   Initiate your campaign with `cdk bootstrap`, laying the groundwork in AWS for your CDK application's siege.

2. **Deploy Your Application**:
   Post-bootstrap, marshal your stacks into AWS with `cdk deploy --all`. Verify that your AWS credentials are set and your IAM policies are appropriately armed for the deployment.

---
