export interface ReadableOrderV2 {
  id: number;
  orderStatus: string;
  datePurchased: string; // ISO date format "YYYY-MM-DD"
  total: number;
  customer: string;
  createdBy: string;
}
