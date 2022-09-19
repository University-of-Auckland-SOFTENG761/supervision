// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { IEnvironment } from './environment.interface';

const environment: IEnvironment = {
  production: false,
  api_url: new URL('http://localhost:3333'),
  auth0: {
    domain: 'dev-6mx9ad29.us.auth0.com',
    client_id: 'SiqwTzesySraxm8Ml8t7wModRdckoh0c',
    redirect_uri: 'http://localhost:4200/patient-details',
  },
};

export default environment;
