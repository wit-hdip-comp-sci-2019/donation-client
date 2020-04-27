import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Candidate, Donation, User } from './donation-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class DonationService {
  users: Map<string, User> = new Map();
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  total = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getCandidates();
    this.getUsers();
  }

  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates.json');
    this.candidates = await response.content;
    console.log(this.candidates);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users.json');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  async donate(amount: number, method: string, candidate: Candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate
    };
    this.donations.push(donation);
    this.total = this.total + amount;
    this.ea.publish(new TotalUpdate(this.total));
    console.log('Total so far ' + this.total);
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    //this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'))
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'))
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
