import { Donation } from './donation-types';

export class TotalUpdate {
  total: number;
  donation: Donation;
  constructor(total: number, donation: Donation) {
    this.total = total;
    this.donation = donation;
  }
}
