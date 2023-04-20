import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.getHotels(userId);

    return res.send(hotels).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { id } = req.params as { id: string };
  const { userId } = req;

  try {
    const hotel = await hotelsService.getHotelById(parseInt(id), userId);

    return res.send(hotel).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}
