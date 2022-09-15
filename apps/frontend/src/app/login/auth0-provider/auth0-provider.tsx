/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Auth0Provider as Auth0ReactProvider } from '@auth0/auth0-react';

type Auth0ProviderProps = {
  children: React.ReactNode;
};

export const AUTH0_DOMAIN = process.env['NX_AUTH0_DOMAIN'];

export const AUTH0_CLIENT_ID =
  process.env['NODE_ENV'] === 'development'
    ? process.env['NX_AUTH0_CLIENT_ID_DEV']
    : process.env['NX_AUTH0_CLIENT_ID_PROD'];

export const AUTH0_REDIRECT_URI =
  process.env['NODE_ENV'] === 'development'
    ? process.env['NX_AUTH0_REDIRECT_URI_DEV']
    : process.env['NX_AUTH0_REDIRECT_URI_PROD'];

export const Auth0Provider = (props: Auth0ProviderProps) => {
  return (
    <Auth0ReactProvider
      domain={AUTH0_DOMAIN!}
      clientId={AUTH0_CLIENT_ID!}
      redirectUri={AUTH0_REDIRECT_URI!}
      scope="openid"
      responseType="code"
      cacheLocation="localstorage"
    >
      {props.children}
    </Auth0ReactProvider>
  );
};

export default Auth0Provider;
