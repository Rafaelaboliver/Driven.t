import { enrollmentTicketVerification } from '../overallBusinessRules';
import { forbiddenError, notFoundError } from '@/errors';
import bookingsRepository from '@/repositories/bookings-repository';
import hotelsRepository from '@/repositories/hotels-repository';

async function createBooking(userId: number, roomId: number) {
  await enrollmentTicketVerification(userId, forbiddenError());

  const hotelRoom = await hotelsRepository.getHotelRoom(roomId);
  if (!hotelRoom) throw notFoundError();
  if (hotelRoom.capacity <= hotelRoom.Booking.length) throw forbiddenError();

  const result = await bookingsRepository.createBooking(userId, roomId);
  if (!result) throw notFoundError();

  return result;
}

async function getBookingByUserId(userId: number) {
  await enrollmentTicketVerification(userId, forbiddenError());

  const booking = await bookingsRepository.getBookingByUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function updateBooking(bookingId: number, roomId: number, userId: number) {
  await enrollmentTicketVerification(userId, forbiddenError());

  const hotelRoom = await hotelsRepository.getHotelRoom(roomId);
  if (!hotelRoom) throw notFoundError();
  if (hotelRoom.capacity <= hotelRoom.Booking.length) throw forbiddenError();

  const booking = await bookingsRepository.checkBookingWithIdAndUserId(bookingId, userId);
  if (!booking) throw forbiddenError();

  const result = await bookingsRepository.updateBooking(bookingId, roomId, userId);
  return result;
}

const bookingsService = {
  createBooking,
  getBookingByUserId,
  updateBooking,
};

export default bookingsService;
