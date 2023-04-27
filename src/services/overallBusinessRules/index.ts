import { notFoundError, paymentRequired } from '@/errors';
import { ApplicationError } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function enrollmentTicketVerification(userId: number, errorName: ApplicationError) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.getTickets(enrollment.id);

  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw errorName;
}
