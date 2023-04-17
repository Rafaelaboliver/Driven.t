import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createNewTicket, getTicketTypes, getTickets } from '@/controllers';
import { createNewTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketTypes)
  .get('/', getTickets)
  .post('/', validateBody(createNewTicketSchema), createNewTicket);

export { ticketsRouter };
