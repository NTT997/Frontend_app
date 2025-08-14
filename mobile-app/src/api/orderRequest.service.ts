import Constant from "@/utils/constant";
import { CrudService } from "./crud.service";
import { getLocalData } from "@/utils/helper";
import { AxiosResponse } from "axios";
import { AuthService } from "./auth.service";

export class OrderRequestService {
    private crudService: CrudService;
    private tokenKey = Constant.AUTH_TOKEN;
    private userIdKey = Constant.USER_ID;

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

    async updateOrderRequestStatusApprovers(requestId: number, param: { approverEmail: string }): Promise<any | null> {
        const token = await getLocalData(this.tokenKey);

        try {
            const response: AxiosResponse<any> = await this.crudService.get(
                `/private/ordering/orders/requests/${requestId}/accept`,
                param,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('[OrderRequest Service] update request failed', error);
            return null;
        }
    }
}