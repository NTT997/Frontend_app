import { getLocalData } from "@/utils/helper";
import { CrudService } from "./crud.service";
import { Order, OrderList, PersistableOrder, ReadableOrderConfirmation } from "@ui/shared-models";
import Constant from "@/utils/constant";
import { AxiosResponse } from "axios";

export class orderService {
    private crudService: CrudService;

    constructor() {
        this.crudService = new CrudService();
    }

    async getOrderList(params: {
        count?: number;
        email?: string;
        id?: number;
        name?: string;
        page?: number;
        phone?: string;
        status?: string;
    }): Promise<OrderList[]> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error('No auth token found');

            // Remove any undefined/null values
            const queryParams: Record<string, string> = {};
            Object.keys(queryParams).forEach(key => {
                if (queryParams[key] === undefined || queryParams[key] === null) {
                    delete queryParams[key];
                }
            });

            const response = await this.crudService.get(
                '/private/ordering/orders',
                queryParams,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('[OrderService] Get order list failed', error);
            return [];
        }
    }

    async getOrderById(id: number, params: {
        count?: number;
        email?: string;
        id?: number;
        name?: string;
        page?: number;
        phone?: string;
        status?: string;
    }): Promise<Order | null> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error('No auth token found');

            // Remove any undefined/null values
            const queryParams: Record<string, string> = {};
            Object.keys(queryParams).forEach(key => {
                if (queryParams[key] === undefined || queryParams[key] === null) {
                    delete queryParams[key];
                }
            });

            const response: AxiosResponse<Order> = await this.crudService.get(
                `/private/ordering/orders/${id}`,
                queryParams,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('[OrderService] Get order by ID failed', error);
            return null;
        }
    }

    async createOrder(orderData: PersistableOrder, cartCode: string): Promise<ReadableOrderConfirmation | null> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error('No auth token found');

            const response: AxiosResponse<ReadableOrderConfirmation> = await this.crudService.post(
                `/private/ordering/cart/${cartCode}/checkout`,
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('[OrderService] Create order failed', error);
            return null;
        }
    }


    async updateOrder(id: number, status: { status: string }): Promise<Order | null> {
        try {
            const token = await getLocalData(Constant.AUTH_TOKEN);
            if (!token) throw new Error('No auth token found');

            const response: AxiosResponse<Order> = await this.crudService.put(
                `/private/ordering/orders/${id}/status`,
                status,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('[OrderService] Update order failed', error);
            return null;
        }
    }

}