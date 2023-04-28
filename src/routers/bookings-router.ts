import { Router } from 'express';
import { createBooking, getBookingByUserId, updateBooking } from '@/controllers';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { bookingSchema, roomsSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(roomsSchema), createBooking)
  .get('/', getBookingByUserId)
  .put('/:bookingId', validateParams(bookingSchema), updateBooking);

export { bookingsRouter };
