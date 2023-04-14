import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { Ticket } from '@/protocols';

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

export async function createNewTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body as Pick<Ticket, 'ticketTypeId'>;

  try {
    const result = await ticketsService.createNewTicket(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
