import { Description } from '../Description';
import { Attribute } from './Attribute';

export interface Product {
  id?: number;
  sku: string;
  refSku: string;
  type: string;
  visible: boolean;
  available: boolean;
  productIsFree: boolean;
  productShipeable: boolean;
  productVirtual: boolean;
  preOrder: boolean;

  quantity: number;
  quantityOrderMinimum: number;
  quantityOrderMaximum: number;

  creationDate: string; // ISO 8601
  dateAvailable: string; // ISO 8601

  rating: number;
  ratingCount: number;

  sortOrder: number;
  price: number;

  descriptions: Description[];
  attributes: Attribute[];

  categories: CategoryRef[];

  inventory: Inventory;

  productSpecifications: ProductSpecifications;

  rentalDuration: number;
  rentalPeriod: number;
  image: productImage;
  images: productImage[];
}

interface productImage {
  name: string, path: string
}

export interface CategoryRef {
  code: string;
  id: number;
}

export interface Inventory {
  sku: string;
  quantity: number;
  expiration: string; // ISO 8601
  price: ProductPrice;
}

export interface ProductPrice {
  id: number;
  code: string;
  sku: string;
  price: number;
  discounted: boolean;
  discountedPrice: number;
  defaultPrice: boolean;
  productAvailabilityId: number;

  discountStartDate?: string; // ISO 8601
  discountEndDate?: string;   // ISO 8601

  descriptions: PriceDescription[];
}

export interface PriceDescription extends Description {
  priceAppender?: string;
}

export interface ProductSpecifications {
  dimensionUnitOfMeasure: string;
  weightUnitOfMeasure: string;
  weight: number;
  height: number;
  length: number;
  width: number;
  manufacturer: string;
  model: string;
}

export interface ProductList {
  number: number;
  products: Product[];
  recordsTotal: number;
  recordsFiltered: number;
  totalPages: number;
}

export interface ReadableProduct {
  productName: string;
  price: string;
  subtotal: string;
  attributes: string;
  sku: string;
  image: string;
}
