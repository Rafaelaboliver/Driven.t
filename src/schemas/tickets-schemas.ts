import Joi from 'joi';

export const createNewTicketSchema = Joi.object({
  ticketTypeId: Joi.number().required(),
});
