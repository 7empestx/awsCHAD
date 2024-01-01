import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export class CognitoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pool = new cognito.UserPool(this, 'UserPool', {
            userPoolName: 'my-user-pool',
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
            },
            autoVerify: {
                email: true,
            },
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true,
                },
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: true,
                requireDigits: true,
                requireSymbols: true,
                tempPasswordValidity: cdk.Duration.days(3),
            },
            accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        const provider = new cognito.UserPoolIdentityProviderAmazon(this, 'Amazon', {
            userPool: pool,
            clientId: 'amz-client-id',
            clientSecret: 'amz-client-secret',
        });

        const client = pool.addClient('my-client', {
            supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.AMAZON],
        });

        client.node.addDependency(provider);
    }
}
