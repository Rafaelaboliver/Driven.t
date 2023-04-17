import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();
  console.log(ticket);

  const userEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  console.log(userEnrollment);
  if (userEnrollment.id !== ticket.enrollmentId) throw unauthorizedError();

  const result = await paymentRepository.findPayment(ticketId);
  console.log(result);
  return result;
}

const paymentsService = {
  getPayments,
};

export default paymentsService;
