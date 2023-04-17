import Joi from 'joi';
import { TicketId } from '@/services/tickets-service';

export const ticketId = Joi.object<TicketId>({
  ticketId: Joi.number().required(),
});
