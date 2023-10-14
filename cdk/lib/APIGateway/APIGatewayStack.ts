import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_apigateway as apiGateway } from 'aws-cdk-lib';

export class APIGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apiGateway.RestApi(this, 'RestApi', {
      
    });
    api.root.addMethod('ANY'); 
  }
}
