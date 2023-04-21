import { notFoundError, paymentRequired } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function enrollmentTicketVerification(userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.getTickets(enrollment.id);

  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequired();
}

export async function getHotels(userId: number) {
  await enrollmentTicketVerification(userId);
  const result = await hotelsRepository.getHotels();
  if (!result.length) throw notFoundError();

  return result;
}

export async function getHotelById(hotelId: number, userId: number) {
  await enrollmentTicketVerification(userId);

  const result = await hotelsRepository.getHotelById(hotelId);
  if (!result) throw notFoundError();
  return result;
}

const hotelsService = {
  getHotels,
  getHotelById,
};

export default hotelsService;
