import { bindable } from 'aurelia-framework';

export class DonateForm {
  amount = '0';
  @bindable
  donations: number[] = [];

  makeDonation() {
    this.donations.push(parseInt(this.amount));
    console.log(this.donations);
  }
}
