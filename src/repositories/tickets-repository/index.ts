import { prisma } from '@/config';
import { TicketType } from '@/protocols';

async function getTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketsRepository = {
  getTicketTypes,
};

export default ticketsRepository;
