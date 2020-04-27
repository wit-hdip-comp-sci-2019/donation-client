import { inject } from 'aurelia-framework';
import { DonationService } from '../../services/donation-service';
import { bindable } from 'aurelia-framework';

@inject(DonationService)
export class TotalDonated {
  @bindable
  total = 0;

  constructor(private ds: DonationService) {}
}
