import { Option } from './Option';
import { OptionValue } from './OptionValue';

export interface Attribute {
    attributeDefault: boolean;
    attributeDisplayOnly: boolean;
    id?: number;
    option?: Option;
    optionValue?: OptionValue;
    productAttributePrice?: number;
    productAttributeWeight?: number;
    productId?: number;
    sortOrder?: number;
}

export interface AttributeList {
    number: number;
    attributes: Attribute[];
    recordsTotal: number;
    recordsFiltered: number;
    totalPages: number;
}