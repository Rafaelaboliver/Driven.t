import { TicketType, Ticket, Payment } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketTypes(): Promise<TicketType[]> {
  const result = await ticketsRepository.getTicketTypes();
  if (!result) throw notFoundError();

  return result;
}

async function getTickets(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findEnrollment(userId);

  const result = await ticketsRepository.getTickets(enrollment.id);
  if (!result) throw notFoundError();

  return result;
}

async function createNewTicket(userId: number, ticketTypeId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) throw notFoundError();

  const result = await ticketsRepository.createNewTicket(enrollment.id, ticketTypeId);
  if (!result) throw notFoundError();

  return result;
}

export type TicketId = Pick<Payment, 'ticketId'>;

const ticketsService = {
  getTicketTypes,
  getTickets,
  createNewTicket,
};

export default ticketsService;
