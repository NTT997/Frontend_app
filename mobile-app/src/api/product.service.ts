import { Product, ProductList } from "@ui/shared-models";
import { CrudService } from "./crud.service";
import { AxiosResponse } from "axios";

export class productService {
    private crudService: CrudService;

    constructor() {
        this.crudService = new CrudService();
    }

    async getProductById(id: number): Promise<Product | null> {
        try {
            const response = await this.crudService.get(`/public/product/${id}`);
            return response.data;
        } catch (error) {
            console.error('[ProductService] Get product by ID failed', error);
            return null;
        }
    }

    /**
   * Find products by filter parameters.
   * All parameters are optional and will be ignored if null or undefined.
   * Example:
   * /public/products?available=true&category=51&count=10&lang=en&manufacturer=1&origin=shop&page=0
   */
    async findByFilter(params: {
        available?: boolean;
        category?: number;
        count?: number;
        lang?: string;
        manufacturer?: number;
        origin?: string;
        page?: number;
    }): Promise<ProductList | null> {
        try {
            // Remove null/undefined params before sending
            const queryParams: Record<string, string> = {};
            Object.entries(params).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    queryParams[key] = String(value);
                }
            });

            const response: AxiosResponse<ProductList> = await this.crudService.get(
                '/public/products',
                queryParams
            );

            return response.data;
        } catch (error) {
            console.error('[ProductService] Find products by filter failed', error);
            return null;
        }
    }
}