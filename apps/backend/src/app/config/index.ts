import * as Joi from 'joi';

export default () => ({
  app: {
    isProduction: process.env.NODE_ENV !== 'development' ?? true,
    port: process.env.APPLICATION_PORT ?? 3333,
  },
  database: {
    host: process.env.DATABASE_HOST ?? '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME ?? 'supervision',
  },
  auth0: {
    issuer_url: process.env.AUTH0_ISSUER_URL,
    audience: process.env.AUTH0_AUDIENCE,
    domain: process.env.AUTH0_DOMAIN,
    redirect_uri: process.env.AUTH0_REDIRECT_URI,
    client: {
      id: process.env.AUTH0_CLIENT_ID,
      secret: process.env.AUTH0_CLIENT_SECRET,
    },
    management: {
      id: process.env.AUTH0_MANAGEMENT_ID,
      secret: process.env.AUTH0_MANAGEMENT_SECRET,
      connection: process.env.AUTH0_MANAGEMENT_CONNECTION,
    },
  },
});

export const configSchema = Joi.object({
  app: Joi.object({
    isProduction: Joi.boolean().required(),
    port: Joi.number().port().required(),
  }),
  production: Joi.boolean(),
  database: Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    username: Joi.string().required(),
    name: Joi.string().required(),
  }),
  auth0: Joi.object({
    issuer_url: Joi.string().uri().required(),
    audience: Joi.string().required(),
    domain: Joi.string().uri().required(),
    client: Joi.object({
      id: Joi.string().required(),
      secret: Joi.string().required(),
      connection: Joi.string().required(),
    }),
  }),
});

export { TypeOrmConfigService } from './TypeOrmConfigService';
