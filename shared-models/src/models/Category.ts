import { Description } from "./Description";

export interface Category {
    children?: Category[];
    code: string;
    depth?: number;
    description?: Description;
    featured?: boolean;
    visible?: boolean;
    linage?: string;
    parent?: Category | null;
    productCount?: number;
    sortOrder?: number;
    store: string;
    id?: number;
}