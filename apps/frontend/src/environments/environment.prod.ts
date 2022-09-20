import { IEnvironment } from './environment.interface';

const environment: IEnvironment = {
  production: true,
  api_url: new URL('https://api.uoa-supervision.org'),
  auth0: {
    redirect_uri: 'https://uoa-supervision.org/patient-details',
    client_id: 'CDkY8YlRlOcYqtLLtVw5XWhLeO8ds88B',
    domain: 'dev-6mx9ad29.us.auth0.com',
  },
};

export default environment;
