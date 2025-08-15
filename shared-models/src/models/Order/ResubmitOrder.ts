export interface AddressInfo {
  address: string;
  billingAddress: boolean;
  bilstateOther: string;
  city: string;
  company: string;
  country: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  latitude: string;
  longitude: string;
  phone: string;
  postalCode: string;
  stateProvince: string;
  zone: string;
}

export interface OrderResubmitPayload {
  billing: AddressInfo;
  delivery: AddressInfo;
  emailAddress: string;
  username: string;
}
