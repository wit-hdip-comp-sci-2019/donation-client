import { inject } from 'aurelia-framework';
import { DonationService } from '../services/donation-service';

@inject(DonationService)
export class Login {
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(private ds: DonationService) {}

  login(e) {
    console.log(`Trying to log in ${this.email}`);
    this.ds.login(this.email, this.password);
  }
}
