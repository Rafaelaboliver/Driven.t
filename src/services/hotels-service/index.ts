import { enrollmentTicketVerification } from '../overallBusinessRules';
import { notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

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
