import { Candidate, Donation } from './donation-types';

export class DonationService {
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
}
