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

async function createNewTicket(enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  const ticket = prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
  return ticket;
}

const ticketsRepository = {
  getTicketTypes,
  getTickets,
  createNewTicket,
};

export default ticketsRepository;
