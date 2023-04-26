import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Room } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/bookings-service';

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { id: roomId } = req.body as Pick<Room, 'id'>;
  try {
    const booking = await bookingsService.createBooking(userId, roomId);

    return res.send(booking.id).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}
