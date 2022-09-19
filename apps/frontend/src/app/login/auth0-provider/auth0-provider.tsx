/* eslint-disable @typescript-eslint/no-non-null-assertion */
import environment from '@environment';
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
      domain={environment.auth0.domain}
      clientId={environment.auth0.client_id}
      redirectUri={environment.auth0.redirect_uri}
      scope="openid"
      responseType="token"
      cacheLocation="localstorage"
    >
      {props.children}
    </Auth0ReactProvider>
  );
};

export default Auth0Provider;
