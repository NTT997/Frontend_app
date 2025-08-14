import { Attribute } from './Product/Attribute';
import { Product, ProductPrice } from './Product/Product';
import { OptionValue } from './Product/OptionValue';
import { Description } from './Description';
import { ReadableOrdertotal } from './Order/Order';

export interface AddToCart {
    attributes?: Attribute[];
    id?: number;
    product: string; // Product SKU
    promoteCode?: string;
    quantity: number;
}

export interface ReadableShoppingCart {
    code: string;
    subtotal?: number;
    displaySubTotal?: string;
    total?: number;
    displayTotal?: string;
    quantity?: number;
    order?: number;
    promoCode?: string;
    variant?: any | null;
    products?: ReadableShoppingCartItem[];
    totals?: ReadableOrdertotal[];
    customer?: number;
}

export interface ReadableShoppingCartAttribute {
    option: any;
    optionValue: any;
}

export interface ReadableMinimalProduct extends Product {
    id?: number;
    description?: Description;
    productPrice?: ProductPrice;
    finalPrice?: string;
    originalPrice?: string | null;
}

export interface ReadableShoppingCartItem extends ReadableMinimalProduct {
    subTotal?: number;
    displaySubTotal?: string;
    cartItemattributes?: ReadableShoppingCartAttribute[];
    variant?: any | null;
    variantValue?: any | null;
}