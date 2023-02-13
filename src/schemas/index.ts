import * as Joi from 'joi';
import { postgresSchema } from './config';

const validationSchema = Joi.object().concat(postgresSchema);

export { validationSchema };
