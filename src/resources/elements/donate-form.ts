import { bindable } from 'aurelia-framework';
import { Donation } from '../../services/donation-types';

export class DonateForm {
  amount = '0';
  @bindable
  donations: Donation[] = [];

  makeDonation() {
    const donation = {
      amount: parseInt(this.amount),
      method: 'cash',
    };
    this.donations.push(donation);
    console.log(this.donations);
  }
}
