import * as Joi from 'joi';
import { jwtSchema, postgresSchema } from './config';

const validationSchema = Joi.object().concat(postgresSchema).concat(jwtSchema);

export { validationSchema };
