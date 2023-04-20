import { ApplicationError } from '@/protocols';

export function paymentRequired(): ApplicationError {
  return {
    name: 'PaymentRequiredError',
    message: 'No payment has been done!',
  };
}
