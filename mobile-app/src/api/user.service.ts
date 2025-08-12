import { getLocalData } from '@/utils/helper';
import { AxiosResponse } from 'axios';
import { CrudService } from './crud.service';
import { ReadableUser } from '@ui/shared-models';

export class UserService {
    private crudService: CrudService;
    private tokenKey = 'auth_token';
    private userIdKey = 'auth_user_id';
    
    constructor(crudService?: CrudService) {
        this.crudService = crudService ?? new CrudService();
    }

    async getProfile(): Promise<any | null> {
        try {
            const token = await getLocalData(this.tokenKey);
            if (!token) throw new Error('No auth token found');

            const response: AxiosResponse<ReadableUser> = await this.crudService.get(
                '/private/user-service/profile'
            );
            return response.data;
        } catch (error) {
            console.error('[UserService] getProfile failed', error);
            return null;
        }
    }
}
