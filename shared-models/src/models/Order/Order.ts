
import { Address } from "../Address";
import { Customer } from "../Customer";
import { ReadableOrderProduct } from "./OrderProduct";
import { Card, Payment } from "./Payment";

export interface Order {
    id?: number;
    attributes: OrderAttributes[];
    billing: Address;
    comments: string;
    confirmedAddress: boolean;
    CreditCard?: Card[];
    currency: string;
    customer: Customer;
    customerAgreed: boolean;
    datePurchased: Date;
    delivery: Address;
    orderStatus: string[];
    paymentModule: string;
    paymentType: string;
    previousOrderStatus: string[];
    product: ReadableOrderProduct[];
    shippingModule: string;
    store: string;
    total: OrderTotal;
    totals: OrderTotal[];
}

export interface OrderList {
    number: number;
    orders: Order[];
    recordsTotal: number;
    recordsFiltered: number;
    totalPages: number;
}

interface OrderAttributes {
    value: string;
    key: string;
}

export interface PersistableOrder {
    attributes?: OrderAttributes[];
    comments?: string;
    customerId?: number;
    id?: number;
    currency?: string;
    customerAgreement?: boolean | true;
    shippingQuote?: number;
    payment?: Payment;
}

export interface OrderTotal {
    id?: number,
    title: string,
    text: string,
    code: string,
    module: string,
    order: number,
    value: number
}

export interface ReadableOrdertotal extends OrderTotal {
    total: string;
    discounted: boolean;
}

interface ReableTotal {
    grandTotal: string;
    total: OrderTotal[];
}

export interface ReadableOrderConfirmation {
    id?: number;
    billing: Address;
    delivery: Address;
    payment: string;
    shipping: string;
    products: ReadableOrderProduct[];
    total?: ReableTotal;
}