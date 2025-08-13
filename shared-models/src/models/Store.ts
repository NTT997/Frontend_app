// types/store.ts
export interface StoreAddress {
  stateProvince: string;
  country: string;
  address: string;
  postalCode: string;
  city: string;
  active: boolean;
}

export interface SupportedLanguage {
  code: string;
  id: number;
}

export interface Store {
  id: number;
  code: string;
  name: string;
  defaultLanguage: string;
  currency: string;
  inBusinessSince: string; // ISO date string
  email: string;
  phone: string;
  template: string | null;
  useCache: boolean;
  currencyFormatNational: boolean;
  retailer: boolean;
  dimension: string;
  weight: string;
  currentUserLanguage: string | null;
  address: StoreAddress;
  logo: string | null;
  parent: any | null;
  supportedLanguages: SupportedLanguage[];
  readableAudit: any | null;
}
