import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda as lambda } from 'aws-cdk-lib';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'Lambda', {
      code: lambda.Code.fromAsset('../typescript-lambda-backend/lambda-function/src'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
    });
  }
}
