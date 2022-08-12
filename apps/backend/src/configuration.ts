import * as Joi from 'joi';

export default () => ({
  production: process.env.PRODUCTION || process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

export const configSchema = Joi.object({
  production: Joi.boolean().default(true),
  database: Joi.object({
    host: Joi.string().hostname().default('127.0.0.1'),
    port: Joi.number().port().default(5432),
    username: Joi.string().required(),
    name: Joi.string().default('supervision'),
  }),
});
