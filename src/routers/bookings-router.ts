import { Router } from 'express';
import { createBooking } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { roomsSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter.all('/*', authenticateToken).post('/', validateBody(roomsSchema), createBooking);

export { bookingsRouter };
