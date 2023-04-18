import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getPayments(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const userEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (userEnrollment.id !== ticket.enrollmentId) throw unauthorizedError();

  const result = await paymentRepository.findPayment(ticketId);
  return result;
}

export async function paymentProcess(userId: number, ticketId: number, cardData: CardData) {
  const ticket = await ticketsRepository.getTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const userEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (userEnrollment.id !== ticket.enrollmentId) throw unauthorizedError();

  const [{ price }] = await ticketsRepository.getTicketTypes();
  const result = await paymentRepository.createPaymentProcess(ticketId, cardData, price);
  await ticketsRepository.updateStatus(ticket.id);
  return result;
}

const paymentsService = {
  getPayments,
  paymentProcess,
};

export default paymentsService;
