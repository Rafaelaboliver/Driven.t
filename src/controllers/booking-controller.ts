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
      Room: booking.Room,
    };
    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { bookingId } = req.params as { bookingId: string };
  const { roomId } = req.body as { roomId: number };
  const { userId } = req;
  try {
    const booking = await bookingsService.updateBooking(parseInt(bookingId), roomId, userId);
    const bookingUpdated = {
      bookingId: booking.id,
    };

    return res.send(bookingUpdated).status(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}
