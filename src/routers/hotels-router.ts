import { Router } from 'express';
import { getHotelById, getHotels } from '@/controllers/hotels-controller';
import { authenticateToken, validateParams } from '@/middlewares';
import { hotelsSchema } from '@/schemas';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getHotels).get('/:id', validateParams(hotelsSchema), getHotelById);

export { hotelsRouter };
