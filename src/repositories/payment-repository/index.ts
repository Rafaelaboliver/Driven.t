import { Payment } from '@prisma/client';
import { prisma } from '@/config';
import { CardData, PaymentProcess } from '@/protocols';

async function findPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPaymentProcess(ticketId: number, cardData: CardData, value: number): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.toLocaleString().slice(-4),
    },
  });
}

const paymentRepository = {
  findPayment,
  createPaymentProcess,
};

export default paymentRepository;
