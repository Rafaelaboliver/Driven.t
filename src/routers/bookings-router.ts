import { Router } from 'express';
import { createBooking, getBookingByUserId } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { roomsSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(roomsSchema), createBooking)
  .get('/', getBookingByUserId);

export { bookingsRouter };
