import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payment-service';
import { CardData } from '@/protocols';

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

export async function paymentProcess(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { ticketId } = req.body as { ticketId: number };
  const { cardData } = req.body as { cardData: CardData };

  try {
    const paymentProcess = await paymentsService.paymentProcess(userId, ticketId, cardData);

    return res.status(httpStatus.OK).send(paymentProcess);
  } catch (error) {
    next(error);
  }
}
