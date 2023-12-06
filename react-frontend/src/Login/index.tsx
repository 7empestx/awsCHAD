import React from "react";
import { Amplify } from 'aws-amplify';
import awsExports from './../../config/aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
      userPoolId: awsExports.USER_POOL_ID,
    }
  }
})

export function LoginPage() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <p>Welcome {user.username}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
