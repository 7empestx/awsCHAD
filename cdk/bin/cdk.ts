import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/S3/S3Stack';
import { LambdaStack } from '../lib/Lambda/LambdaStack';
import { APIGatewayStack } from '../lib/APIGateway/APIGatewayStack';
import { CloudfrontStack } from '../lib/Cloudfront/CloudfrontStack';
import { CognitoStack } from '../lib/Cognito/CognitoStack';

const app = new cdk.App();

const s3Stack = new S3Stack(app, 'S3Stack');

new LambdaStack(app, 'LambdaStack');
new APIGatewayStack(app, 'APIGatewayStack');
new CloudfrontStack(app, 'CloudfrontStack', s3Stack.myBucket);
new CognitoStack(app, 'CognitoStack');
