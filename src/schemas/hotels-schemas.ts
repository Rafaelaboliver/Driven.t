import { Hotel } from '@prisma/client';
import Joi from 'joi';

export const hotelsSchema = Joi.object<Pick<Hotel, 'id'>>({
  id: Joi.number().required(),
});
