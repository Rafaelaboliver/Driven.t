import { Router } from 'express';
import { authenticateToken, validateQuery } from '@/middlewares';
import { getPayments } from '@/controllers/payments-controller';
import { ticketId } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', validateQuery(ticketId), getPayments);

export { paymentsRouter };
