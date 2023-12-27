import React from "react";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Use the DefinePlugin to set environment variables during the build process
const USER_POOL_APP_CLIENT_ID = process.env.USER_POOL_APP_CLIENT_ID || '';
const USER_POOL_ID = process.env.USER_POOL_ID || '';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: USER_POOL_APP_CLIENT_ID,
      userPoolId: USER_POOL_ID,
    }
  }
});

export function LoginPage() {
  return (
    <Authenticator signUpAttributes={['phone_number']}>
      {({ signOut, user }) => (
        <div>
          <p>Welcome {user?.username}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
