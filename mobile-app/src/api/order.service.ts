import { getLocalData } from "@/utils/helper";
import { CrudService } from "./crud.service";
import { Order, OrderList } from "@ui/shared-models";
import Constant from "@/utils/constant";

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

    async getOrderById(id: number): Promise<Order | null> {
        try {
            const response = await this.crudService.get(`/public/order/${id}`);
            return response.data;
        } catch (error) {
            console.error('[OrderService] Get order by ID failed', error);
            return null;
        }
    }

    async createOrder(orderData: Order): Promise<Order | null> {
        try {
            const response = await this.crudService.post('/private/order', orderData);
            return response.data;
        } catch (error) {
            console.error('[OrderService] Create order failed', error);
            return null;
        }
    }

    async updateOrder(id: number, orderData: Order): Promise<Order | null> {
        try {
            const response = await this.crudService.put(`/private/order/${id}`, orderData);
            return response.data;
        } catch (error) {
            console.error('[OrderService] Update order failed', error);
            return null;
        }
    }

    async deleteOrder(id: number): Promise<boolean> {
        try {
            await this.crudService.delete(`/private/order/${id}`);
            return true;
        } catch (error) {
            console.error('[OrderService] Delete order failed', error);
            return false;
        }
    }
}