import { Booking } from '@prisma/client';
import Joi from 'joi';
import { BookingId } from '@/protocols';

export const roomsSchema = Joi.object<Pick<Booking, 'roomId'>>({
  roomId: Joi.number().required(),
});

export const bookingSchema = Joi.object<BookingId>({
  bookingId: Joi.number().required(),
});
