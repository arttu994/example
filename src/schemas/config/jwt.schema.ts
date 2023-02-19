import * as Joi from 'joi';

const jwtSchema = Joi.object({
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRES: Joi.string().required(),

  REFRESH_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES: Joi.string().required(),
});

export default jwtSchema;
