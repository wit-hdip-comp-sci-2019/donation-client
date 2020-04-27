export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
  _id : string;
}

export interface Donation {
  amount: number;
  method: string;
  candidate: Candidate;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}

export interface RawDonation {
  amount: number;
  method: string;
  candidate: string;
  donor: string;
}
