import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createNewTicket, getTicketTypes, getTickets } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTickets)
  .post('/', createNewTicket);

export { ticketsRouter };
