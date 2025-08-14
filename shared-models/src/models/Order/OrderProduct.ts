import { ReadableProduct } from "../Product/Product";

export interface OrderProductEntity extends OrderProduct {
    orderQuantity: number;
    product: ReadableProduct;
}

export interface OrderProduct {
    sku: string;
    id?: number;
}

export interface ReadableOrderProduct {
    productName: string;
    price: string
    subTotal: string;
    attributes: ReadableOrderProductAttribute[];
    sku: string;
    image: string;
}

export interface ReadableOrderProductAttribute {
    id?: number;
    attributeName: string;
    attributePrice: string;
    attributeValue: string;
}