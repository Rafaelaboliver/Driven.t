import { notFoundError } from '@/errors';
import { TicketType } from '@/protocols';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketsRepository.getTicketTypes();
  if (!result) throw notFoundError;

  return result;
}

const ticketsService = {
  getTicketTypes,
};

export default ticketsService;