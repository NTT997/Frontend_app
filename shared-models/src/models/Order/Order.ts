
import { Address } from "../Address";
import { Product } from "../Product/Product";
import { ReadableOrderProduct } from "./OrderProduct";
import { Payment } from "./Payment";

export interface Order {

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