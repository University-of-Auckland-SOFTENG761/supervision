/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Auth0Provider as Auth0ReactProvider } from '@auth0/auth0-react';

type Auth0ProviderProps = {
  children: React.ReactNode;
};

const AUTH0_CLIENT_ID =
  process.env['NODE_ENV'] === 'development'
    ? process.env['NX_AUTH0_CLIENT_ID_DEV']
    : process.env['NX_AUTH0_CLIENT_ID_PROD'];

const AUTH0_REDIRECT_URI =
  process.env['NODE_ENV'] === 'development'
    ? process.env['NX_AUTH0_REDIRECT_URI_DEV']
    : process.env['NX_AUTH0_REDIRECT_URI_PROD'];

export const Auth0Provider = (props: Auth0ProviderProps) => {
  return (
    <Auth0ReactProvider
      domain={process.env['NX_AUTH0_DOMAIN']!}
      clientId={AUTH0_CLIENT_ID!}
      redirectUri={AUTH0_REDIRECT_URI!}
      responseType="code"
      scope="openid"
    >
      {props.children}
    </Auth0ReactProvider>
  );
};

export default Auth0Provider;
