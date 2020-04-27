import { inject } from 'aurelia-framework';
import { Candidate, Donation, User } from './donation-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator)
export class DonationService {
  users: Map<string, User> = new Map();
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  total = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator) {
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
}
