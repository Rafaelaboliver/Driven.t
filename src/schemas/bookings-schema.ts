import { Booking } from '@prisma/client';
import Joi from 'joi';

export const roomsSchema = Joi.object<Pick<Booking, 'roomId'>>({
  roomId: Joi.number().required(),
});
