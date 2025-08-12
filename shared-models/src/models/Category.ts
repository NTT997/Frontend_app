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

export interface CategoryList extends Category {
    number: number;
    categories: Category[];
    recordsTotal: number;
    recordsFiltered: number;
    totalPages: number;
}

/**
 * Request payload for fetching category hierarchy from root.
 * `filter` can contain values like "FEATURED_CATEGORIES", "VISIBLE_ONLY".
 */
export interface CategoryHierarchyRequest {
  count: number;
  filter: string[];
  name?: string;
  page: number;
}
