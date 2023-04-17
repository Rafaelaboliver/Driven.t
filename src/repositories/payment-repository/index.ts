import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findPayment(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = {
  findPayment,
};

export default paymentRepository;
