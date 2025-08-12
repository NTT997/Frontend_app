import { Address } from "./Address";
import { Group } from "./Security";

export interface Customer {
  id: number;
  emailAddress: string;
  billing: Address;
  delivery: Address;
  gender: string; // Could be an enum if only certain values like 'M', 'F'
  language: string;
  firstName: string;
  lastName: string;
  provider: string;
  storeCode: string | null;
  userName: string;
  rating: number;
  ratingCount: number;
  attributes: any[]; // Define a proper interface if attributes structure is known
  groups: Group[];
}

export interface CustomerList {
  customers: Customer[];
  recordsFiltered: number;
  recordsTotal: number;
  number: number;
  totalPages: number;
}