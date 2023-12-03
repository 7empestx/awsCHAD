import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/S3/S3Stack';
import { LambdaStack } from '../lib/Lambda/LambdaStack';
import { APIGatewayStack } from '../lib/APIGateway/APIGatewayStack';
import { CloudfrontStack } from '../lib/Cloudfront/CloudfrontStack';
import { CognitoStack } from '../lib/Cognito/CognitoStack';
import { PipelineStack } from '../lib/Pipeline/PipelineStack';

const app = new cdk.App();

const pipelineStack = new PipelineStack(app, 'PipelineStack', {
  env: {
    account: '659946347679',
    region: 'us-west-2',
  },
});

const s3Stack = new S3Stack(app, 'S3Stack');

new LambdaStack(app, 'LambdaStack');
new APIGatewayStack(app, 'APIGatewayStack');
new CloudfrontStack(app, 'CloudfrontStack', s3Stack.myBucket);
new CognitoStack(app, 'CognitoStack');
