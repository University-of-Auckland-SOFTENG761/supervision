import { IEnvironment } from './environment.interface';

const environment: IEnvironment = {
  production: true,
  api_url: new URL('https://api.uoa-supervision.org'),
};

export default environment;
