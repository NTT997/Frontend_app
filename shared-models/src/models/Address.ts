/**
 * Represents a physical address including city, postal code, state/province, and country.
 * This structure is commonly used in both customer and merchant address records.
 */
export interface Address {
  stateProvince: string; // Typically a zone or state code
  country: string;       // ISO country code
  address: string;
  postalCode: string;
  city: string;
  active: boolean;
}
