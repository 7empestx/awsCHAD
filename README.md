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

## awsChad Deployment Guide:

To ensure a seamless deployment, please prepare the following prerequisites:

1. **IAM User Configuration**:
   - Set up an IAM user and generate access keys for use with the AWS Command Line Interface (CLI).
   - Assign a policy to this user with the following permissions:
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
                     "arn:aws:iam::301455343002:*",
                     "arn:aws:cloudformation:us-east-1:301455343002:*",
                     "arn:aws:ssm:us-east-1:301455343002:*",
                     "arn:aws:ecr:us-east-1:301455343002:*",
                     "arn:aws:s3:::*"
                 ]
             }
         ]
     }
     ```
     This policy is designed to empower `cdk bootstrap` execution without permission roadblocks.
     Caution: The listed policy is broad; refine it to fit your security model. Protect your access keys diligently and avoid exposing them in any public or private code repositories.

2. **AWS CLI Installation**:
   - Install the AWS CLI following the guide at [AWS CLI Installation](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).
   - Configure the CLI by executing `aws configure` and inputting your IAM user's credentials.

3. **Domain Registration**:
   - Register and configure your domain in Amazon Route 53. Detailed instructions are available in the [Route 53 Domain Registration Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html).

4. **Local Environment Setup**:
   - Generate a `.env` file within the `cdk` directory of your project. Define the domain name obtained from Route 53:
     ```
     DOMAIN_NAME="YourChosenRoute53Domain.com"
     ```
     Substitute `YourChosenRoute53Domain.com` with your registered domain to confirm its active role in your deployment.

5. **CodeCommit Repository Setup**:
   - Create a CodeCommit repository named `awsChad` in the `us-east-1` region. Should you select a different repository name or region, adjust the pipeline stack's settings to align with these changes.
   - Upload the contents of your cloned awsChad repository to this new CodeCommit repository.

By following these steps, you're well on your way to deploying awsChad with the robust infrastructure it deserves.

## Harnessing the CDK:

**Before you command the CDK, ensure your AWS credentials and IAM policies are battle-ready.**

1. **Bootstrap Your AWS Environment**:
   Initiate your campaign with `cdk bootstrap`, laying the groundwork in AWS for your CDK application's siege.

2. **Deploy Your Application**:
   Post-bootstrap, marshal your stacks into AWS with `cdk deploy --all`. Verify that your AWS credentials are set and your IAM policies are appropriately armed for the deployment.

---
