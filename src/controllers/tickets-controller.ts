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

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketsService.getTickets(userId);
    return res.send(tickets).status(httpStatus.OK);
  } catch (error) {
    res.send(httpStatus.NOT_FOUND);
  }
}
