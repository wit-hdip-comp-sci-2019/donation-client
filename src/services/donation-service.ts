import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Candidate, Donation, RawDonation, User } from './donation-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class DonationService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  total = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure((http) => {
      http.withBaseUrl('http://localhost:3000');
    });
  }

  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates');
    this.candidates = await response.content;
    console.log(this.candidates);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach((user) => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
  }

  async getDonations() {
    const response = await this.httpClient.get('/api/donations');
    const rawDonations: RawDonation[] = await response.content;
    rawDonations.forEach((rawDonation) => {
      const donation = {
        amount: rawDonation.amount,
        method: rawDonation.method,
        candidate: this.candidates.find((candidate) => rawDonation.candidate == candidate._id),
        donor: this.usersById.get(rawDonation.donor),
      };
      this.donations.push(donation);
    });
  }

  async donate(amount: number, method: string, candidate: Candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate,
    };
    const response = await this.httpClient.post('/api/candidates/' + candidate._id + '/donations', donation);
    this.donations.push(donation);
    this.total = this.total + amount;
    this.ea.publish(new TotalUpdate(this.total));
    console.log('Total so far ' + this.total);
  }

  async createCandidate(firstName: string, lastName: string, office: string) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office,
    };
    const response = await this.httpClient.post('/api/candidates', candidate);
    const newCandidate = await response.content;
    this.candidates.push(newCandidate);
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    this.changeRouter(PLATFORM.moduleName('app'));
    return false;
  }

  async login(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/authenticate', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure((configuration) => {
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });
        await this.getCandidates();
        await this.getUsers();
        await this.getDonations();
        this.changeRouter(PLATFORM.moduleName('app'));
        success = status.success;
      }
    } catch (e) {
      success = false;
    }
    return success;
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  changeRouter(module: string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
