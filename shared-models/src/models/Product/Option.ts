import { Description } from "../Description"

export interface Option {
    id?: number;
    code: string;
    type: string;
    order?: number | 0;
    description?: Description[];
    readonly?: boolean;
}

export interface OptionList { 
    number: number;
    options: Option[];
    recordsTotal: number;
    recordsFiltered: number;
    totalPages: number;
}