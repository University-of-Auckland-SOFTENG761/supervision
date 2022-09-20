import { Auth0Client } from '@auth0/auth0-spa-js';
import environment from '@environment';

let idToken: string | undefined = undefined;

export const getIdToken = async () => {
  const client = new Auth0Client({
    domain: environment.auth0.domain,
    client_id: environment.auth0.client_id,
    redirect_uri: environment.auth0.redirect_uri,
    scope: 'openid',
    responseType: 'code',
    cacheLocation: 'localstorage',
  });

  if (!client.isAuthenticated()) {
    idToken = undefined;
    return idToken;
  }

  const claims = await client.getIdTokenClaims();
  idToken = claims?.__raw;
  return idToken;
};

export const getGraphQlHeaders = async () => {
  const idToken = await getIdToken();
  const userEmail = sessionStorage.getItem('userEmail');
  return idToken || userEmail
    ? {
        Authorization: `Bearer ${idToken}`,
      }
    : undefined;
};
