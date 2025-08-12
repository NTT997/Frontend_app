import { CrudService } from "./crud.service";
import { Customer, CustomerList } from "@ui/shared-models";
import { AxiosResponse } from "axios";
import { getLocalData } from '../utils/helper';
import Constant from "@/utils/constant";

export class CustomerService {
    private crudService: CrudService;
    private tokenKey = Constant.AUTH_TOKEN;

    constructor() {
        this.crudService = new CrudService();
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        try {
            const response = await this.crudService.get(`/public/customer/${id}`);
            return response.data;
        } catch (error) {
            console.error('[CustomerService] Get customer by ID failed', error);
            return null;
        }
    }

    async updateCustomerDetails(id: number, details: any): Promise<any | null> {
        try {
            const response = await this.crudService.put(`/private/customer/${id}`, details);
            return response.data;
        } catch (error) {
            console.error('[CustomerService] Update customer details failed', error);
            return null;
        }
    }

    async CustomerList(): Promise<CustomerList | null> {
        try {
            const token = await getLocalData(this.tokenKey);
            if (!token) throw new Error('No auth token found');

            const response: AxiosResponse<CustomerList> = await this.crudService.get(
                '/private/admin-customer-service/customers',
                undefined,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('[CustomerService] Get customer list failed', error);
            return null;
        }
    }
}