import { notFoundError } from '@/errors';
import { TicketType, Ticket } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketsRepository.getTicketTypes();
  if (!result) throw notFoundError;

  return result;
}

async function getTickets(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findEnrollment(userId);
  const result = await ticketsRepository.getTickets(enrollment.id);

  if (!result) throw notFoundError;
  return result;
}

const ticketsService = {
  getTicketTypes,
  getTickets,
};

export default ticketsService;
