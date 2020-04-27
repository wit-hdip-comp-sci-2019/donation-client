import { bindable } from 'aurelia-framework';
import { Donation } from '../../services/donation-types';

export class DonateForm {
  amount = '0';
  @bindable
  donations: Donation[] = [];
  @bindable
  paymentMethods: string[];

  selectedMethod = '';

  makeDonation() {
    const donation = {
      amount: parseInt(this.amount),
      method: this.selectedMethod,
    };
    this.donations.push(donation);
    console.log(this.donations);
  }
}
