import { getLocalData } from "@/utils/helper";
import { CrudService } from "./crud.service";
import Constant from "@/utils/constant";
import { AxiosResponse } from "axios";
import { AddToCart, ReadableShoppingCart } from "@ui/shared-models";
export class CartService {
    private crudService: CrudService;

    constructor() {
        this.crudService = new CrudService();
    }

    // Create a new cart
    async createCart(cartData: AddToCart): Promise<ReadableShoppingCart | null> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error("No auth token found");

            const response: AxiosResponse<ReadableShoppingCart> = await this.crudService.post(
                `/public/shoppingcart/cart`,
                cartData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error("[CartService] Create cart failed", error);
            return null;
        }
    }

    // Get a cart by ID
    async getCartByCode(code: string): Promise<ReadableShoppingCart | null> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error("No auth token found");

            const response: AxiosResponse<ReadableShoppingCart> = await this.crudService.get(
                `/public/shoppingcart/cart/${code}`,
                undefined,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error("[CartService] Get cart failed", error);
            return null;
        }
    }

    // Update a cart
    async updateCart(code: string, cartData: AddToCart): Promise<ReadableShoppingCart | null> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error("No auth token found");

            const response: AxiosResponse<ReadableShoppingCart> = await this.crudService.put(
                `/public/shoppingcart/cart/${code}`,
                cartData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error("[CartService] Update cart failed", error);
            return null;
        }
    }

    // Delete a cart
    async deleteCart(code: string, sku: string): Promise<boolean> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error("No auth token found");

            await this.crudService.delete(
                `/public/shoppingcart/cart/${code}}/product/${sku}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return true;
        } catch (error) {
            console.error("[CartService] Delete cart failed", error);
            return false;
        }
    }
}
