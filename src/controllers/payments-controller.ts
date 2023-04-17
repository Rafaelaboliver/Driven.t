import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payment-service';

export async function getPayments(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query as { ticketId: string };
  const { userId } = req;

  try {
    const payment = await paymentsService.getPayments(parseInt(ticketId), userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
