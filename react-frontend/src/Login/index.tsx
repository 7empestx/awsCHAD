import React from "react";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import dotenv from 'dotenv';

dotenv.config();

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.USER_POOL_APP_CLIENT_ID,
      userPoolId: process.env.USER_POOL_ID, 
    }
  }
})

export function LoginPage() {
  return (
    <Authenticator signUpAttributes={['phone_number']}>
      {({ signOut, user }) => (
        <div>
          <p>Welcome {user.username}</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}
