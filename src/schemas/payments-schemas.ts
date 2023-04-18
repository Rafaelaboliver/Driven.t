import Joi from 'joi';
import { TicketId } from '@/services/tickets-service';
import { PaymentProcess } from '@/protocols';

export const ticketIdSchema = Joi.object<TicketId>({
  ticketId: Joi.number().required(),
});

export const paymentSchema = Joi.object<PaymentProcess>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(),
});
