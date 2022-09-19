// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { IEnvironment } from './environment.interface';

const environment: IEnvironment = {
  production: false,
  api_url: new URL('http://localhost:3333'),
};

export default environment;
