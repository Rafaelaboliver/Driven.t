import { Router } from 'express';
import { createBooking } from '@/controllers';

const bookingsRouter = Router();

bookingsRouter.post('/', createBooking);

export { bookingsRouter };
