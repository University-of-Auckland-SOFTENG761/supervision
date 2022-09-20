export interface IEnvironment {
  production: boolean;
  api_url: URL;
  auth0: {
    client_id: string;
    redirect_uri: string;
    domain: string;
  };
}
