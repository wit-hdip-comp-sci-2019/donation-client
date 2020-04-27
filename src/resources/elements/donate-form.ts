import { bindable } from 'aurelia-framework';
import { Candidate, Donation } from '../../services/donation-types';

export class DonateForm {
  amount = '0';
  @bindable
  donations: Donation[] = [];
  @bindable
  paymentMethods: string[];

  @bindable
  candidates: Candidate[] = [];

  selectedMethod = '';
  selectedCandidate : Candidate = null;

  constructor() {
    this.candidates.push({ firstName: 'Bart', lastName: 'Simpson', office: 'president' });
    this.candidates.push({ firstName: 'Lisa', lastName: 'Simpson', office: 'president' });
  }

  makeDonation() {
    const donation = {
      amount: parseInt(this.amount),
      method: this.selectedMethod,
    };
    this.donations.push(donation);
    console.log(this.donations);
  }
}
