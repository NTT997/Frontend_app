import { Description } from '../Description';

export interface OptionValue {
    code: string;
    defaultValue: boolean;
    descriptions?: Description[];
    id?: number;
    image?: string;
    name: string;
    order: number;
    sortOrder?: number;
}

export interface OptionGet extends OptionValue {
    price: string;
}

export interface OptionValueList {
    number: number;
    optionValues: OptionValue[];
    recordsTotal: number;
    recordsFiltered: number;
    totalPages: number;
}

