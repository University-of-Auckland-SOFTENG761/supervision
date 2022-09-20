/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import environment from '@environment';
import { Auth0Provider as Auth0ReactProvider } from '@auth0/auth0-react';

type Auth0ProviderProps = {
  children: React.ReactNode;
};

export const Auth0Provider = (props: Auth0ProviderProps) => {
  return (
    <Auth0ReactProvider
      domain={environment.auth0.domain}
      clientId={environment.auth0.client_id}
      redirectUri={environment.auth0.redirect_uri}
      scope="openid"
      responseType="code"
      cacheLocation="localstorage"
    >
      {props.children}
    </Auth0ReactProvider>
  );
};

export default Auth0Provider;
