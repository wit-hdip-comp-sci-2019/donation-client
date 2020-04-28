export interface Candidate {
  firstName: string;
  lastName: string;
  office: string;
  _id: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Donation {
  amount: number;
  method: string;
  candidate: Candidate;
  location: Location;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: string;
}
