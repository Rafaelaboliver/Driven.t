import { prisma } from '@/config';
import { Ticket, TicketType } from '@/protocols';

async function getTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTickets(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}
const ticketsRepository = {
  getTicketTypes,
  getTickets,
};

export default ticketsRepository;
