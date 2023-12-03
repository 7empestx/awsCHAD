import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Repository } from 'aws-cdk-lib/aws-codecommit'; 

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = Repository.fromRepositoryName(this, 'MyRepository', 'awsChad');

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'ReactAppPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.codeCommit(repository, 'main'), 
        commands: [
          'cd react-frontend',
          'npm ci',
          'npm run build',
          'cd ..',
        ]
      })
    });
  }
}
