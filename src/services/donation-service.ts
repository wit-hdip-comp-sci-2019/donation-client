import { inject } from 'aurelia-framework';
import { Candidate, Donation } from './donation-types';
import { HttpClient } from 'aurelia-http-client';

@inject(HttpClient)
export class DonationService {
  candidates: Candidate[] = [];
  donations: Donation[] = [];
  paymentMethods = ['Cash', 'Paypal'];
  total = 0;

  constructor(private httpClient: HttpClient) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    this.getCandidates();
  }

  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates.json');
    this.candidates = await response.content;
    console.log (this.candidates);
  }

  async donate(amount: number, method: string, candidate: Candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate : candidate
    };
    this.donations.push(donation);
    this.total = this.total + amount;
    console.log('Total so far ' + this.total);
  }
}
