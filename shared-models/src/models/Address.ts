/**
 * Represents a physical address including city, postal code, state/province, and country.
 * This structure is commonly used in both customer and merchant address records.
 */
export interface Address {
  postalCode: string;
  countryCode: string | null;
  firstName: string;
  lastName: string;
  bilstateOther: string | null;
  company: string;
  phone: string;
  address: string;
  city: string;
  stateProvince: string;
  billingAddress: boolean;
  latitude: number | null;
  longitude: number | null;
  zone: string;
  country: string;
}
