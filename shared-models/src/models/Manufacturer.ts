import { Description } from './Description';

export interface Manufacturer {
  code: string;
  descriptions: Description[];
  id?: number;
  order: number;
}

export interface ManufacturerList {
  number: number;
  manufacturers: Manufacturer[];
  recordsTotal: number;
  recordsFiltered: number;
  totalPages: number;
}