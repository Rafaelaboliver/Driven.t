import { enrollmentTicketVerification } from '../overallBusinessRules';
import { forbiddenError, notFoundError } from '@/errors';
import bookingsRepository from '@/repositories/bookings-repository';
import hotelsRepository from '@/repositories/hotels-repository';

async function createBooking(userId: number, roomId: number) {
  await enrollmentTicketVerification(userId, forbiddenError());
  const hotelRoom = await hotelsRepository.getHotelRoom(roomId);
  if (hotelRoom.capacity <= hotelRoom.Booking.length) throw forbiddenError();

  const result = await bookingsRepository.createBooking(userId, roomId);
  if (!result) throw notFoundError();

  return result;
}

const bookingsService = {
  createBooking,
};

export default bookingsService;
