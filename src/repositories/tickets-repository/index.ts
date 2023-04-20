import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTickets(enrollmentId: number) {
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

async function getTicketById(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
}

async function updateStatus(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = {
  getTicketTypes,
  getTickets,
  createNewTicket,
  getTicketById,
  updateStatus,
};

export default ticketsRepository;
