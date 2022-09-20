import { Auth0Client } from '@auth0/auth0-spa-js';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_REDIRECT_URI } from '@login';

let idToken: string | undefined = undefined;

export const getIdToken = async () => {
  const client = new Auth0Client({
    domain: AUTH0_DOMAIN ?? '',
    client_id: AUTH0_CLIENT_ID ?? '',
    redirect_uri: AUTH0_REDIRECT_URI ?? '',
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
