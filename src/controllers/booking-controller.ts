import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Booking } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/booking-service';

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body as Pick<Booking, 'roomId'>;
  try {
    const booking = await bookingsService.createBooking(userId, roomId);
    const bookingId = booking.id;

    return res.send({ bookingId }).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const booking = await bookingsService.getBookingByUserId(userId);
    const result = {
      id: booking.id,
      room: booking.Room,
    };
    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}
