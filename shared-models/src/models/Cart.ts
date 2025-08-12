import { Attribute } from './Product/Attribute';
import { Product } from './Product/Product';
import { OptionValue } from './Product/OptionValue';
import { Description } from './Description';

export interface AddToCart {
    attributes?: Attribute[];
    id?: number;
    product: string; // Product SKU
    promoteCode?: string;
    quantity: number;
}

export interface Cart {
    id?: number; // Cart ID
    language?: string; // Language code (e.g. "en", "fr")
    code?: string; // Cart code (if applicable)
    subtotal?: number; // Subtotal price of the cart
    displaySubtotal?: string; // Localized string representation of subtotal
    total?: number; // Total price of the cart
    displayTotal?: string; // Localized string representation of total
    quantity?: number; // Total quantity of items in the cart
    orderId?: number; // Associated order ID (if converted to order)

    promoCode?: string; // Applied promotion code (if any)
    variant?: string | null;
    products?: CartItem[]; // List of products in the cart
    totals?: null;
    customer: null;

}

export interface ShoppingCartItem {
    

}

/**
 * Detailed Cart item returned by the API / used in cart UI.
 */
export interface CartItem {
    /** cart item record id (if provided by backend) */
    id?: number;

    /** Full product payload (optional — some APIs return full product) */
    product?: Product;

    /** Product identifier (id) or SKU shortcuts for lighter payloads */
    productId?: number;
    sku?: string;

    /** Quantity of this item in the cart */
    quantity: number;

    /** Unit prices */
    price?: number;         // base unit price (number)
    finalPrice?: number;    // unit price after discounts/promotions

    /** Subtotal (price * quantity) */
    subTotal?: number;
    displaySubTotal?: string; // localized string (e.g. "₫1,200,000")

    /** Selected product attributes for this cart line (e.g. size, color) */
    attributes?: Attribute[];
    cartItemAttributes?: Attribute[]; // alias for backwards compatibility

    /**
     * Variant references — many shop APIs use an OptionValue-like structure
     * for the chosen variant and its value. Kept optional to match APIs.
     */
    variant?: OptionValue | null;
    variantValue?: OptionValue | null;

    /** Descriptions or localized text for the cart item (optional) */
    descriptions?: Description[];

    /** Image(s) useful for UI rendering */
    image?: string;
    images?: string[];

    /** Any extra fields your backend may return — preserves forwards-compatibility */
    [key: string]: any;
}