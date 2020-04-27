import { Donation } from '../services/donation-types';

export class Donate {
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
}
