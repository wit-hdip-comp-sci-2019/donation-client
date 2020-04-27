export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
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
}
