import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.getTicketTypes();
    return res.send(ticket).status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NO_CONTENT);
  }
}
