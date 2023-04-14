import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, getTickets } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getTicketTypes).get('/', getTickets);

export { ticketsRouter };
