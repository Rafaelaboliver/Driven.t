import { Router } from 'express';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { getPayments, paymentProcess } from '@/controllers/payments-controller';
import { paymentSchema, ticketIdSchema } from '@/schemas/payments-schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', validateQuery(ticketIdSchema), getPayments)
  .post('/process', validateBody(paymentSchema), paymentProcess);

export { paymentsRouter };
