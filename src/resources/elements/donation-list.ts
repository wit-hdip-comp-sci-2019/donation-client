import { bindable } from 'aurelia-framework';
import { Donation } from '../../services/donation-types';

export class DonationList {
  @bindable
  donations: Donation[];
}
