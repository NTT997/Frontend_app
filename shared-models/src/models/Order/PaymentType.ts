export enum PaymentMethodKey {
  MONEYORDER = "MONEYORDER",
  STRIPE = "STRIPE",
  // future expansion: PAYPAL = "PAYPAL"
}

export interface PaymentMethod {
  key: PaymentMethodKey;
  label: string;
}

export const PAYMENT_METHODS: Record<PaymentMethodKey, string> = {
  [PaymentMethodKey.MONEYORDER]: "Money Order",
  [PaymentMethodKey.STRIPE]: "Credit Card (Stripe)",
};
