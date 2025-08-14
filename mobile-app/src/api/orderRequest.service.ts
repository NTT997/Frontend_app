import Constant from "@/utils/constant";
import { CrudService } from "./crud.service";
import { getLocalData } from "@/utils/helper";
import { AxiosResponse } from "axios";

export class OrderRequestService {
    private crudService: CrudService;
    private tokenKey = Constant.AUTH_TOKEN;

    constructor(crudService?: CrudService) {
        this.crudService = crudService ?? new CrudService();
    }


    async fetchListOrderRequestByEmail(param: { email?: string, status: string }): Promise<any | null> {
        const token = await getLocalData(this.tokenKey);

        try {
            const response: AxiosResponse<any> = await this.crudService.get(
                `/private/ordering/orders/requests/approver`,
                param,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data
        } catch (error) {
            console.error('[OrderRequest Service] fetch requests failed', error);
            return null;
        }
    }

    async updateOrderRequestStatusApprovers(requestId: number, approverEmail: string): Promise<any | null> {
        const token = await getLocalData(this.tokenKey);

        try {
            const response: AxiosResponse<any> = await this.crudService.patch(
                `/private/ordering/orders/requests/${requestId}/accept`,
                undefined,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {approverEmail}
                }
            );
            return response.data;
        } catch (error) {
            console.error('[OrderRequest Service] update request failed', error);
            return null;
        }
    }

    async rejectOrderRequest(requestId: number, approverEmail: string, param: { note?: string }
    ): Promise<any | null> {
        try {
            const token = await getLocalData(this.tokenKey);

            const response: AxiosResponse<any> = await this.crudService.get(
                `/private/ordering/orders/requests/${requestId}/reject`,
                undefined,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {approverEmail, ...param}
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error: unknown) {
            console.error('[OrderRequest Service] update request failed', error);
            return null;
        }
    }
}