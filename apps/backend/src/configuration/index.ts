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
});

export { TypeOrmConfigService } from './TypeOrmConfigService';
