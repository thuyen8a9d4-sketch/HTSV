import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  FRONTEND_ORIGIN: Joi.string().uri().required(),

  CORE_DATABASE_URL: Joi.string().uri({ scheme: ['postgresql', 'postgres'] }).required(),

  JWT_ACCESS_SECRET: Joi.string().min(16).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().min(16).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().default(587),
  MAIL_FROM: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().allow('').default(''),
  MAIL_DISPLAY_NAME: Joi.string().default('HTSV'),

  ADMIN_SEED_USERNAME: Joi.string().default('admin'),
  ADMIN_SEED_EMAIL: Joi.string().default('admin@htsv.local'),
  ADMIN_SEED_PASSWORD: Joi.string().default('Admin@123'),
});
