import { getLocalData } from '@/utils/helper';
import { AxiosResponse } from 'axios';
import { CrudService } from './crud.service';
import { ReadableUser } from '@ui/shared-models';
import Constant from '@/utils/constant';

const tokenKey = Constant.AUTH_TOKEN;

export class UserService {
    private crudService: CrudService;

    constructor(crudService?: CrudService) {
        this.crudService = crudService ?? new CrudService();
    }

    async getProfileDetail(): Promise<ReadableUser | null> {
        try {
            const token = await getLocalData(tokenKey);

            const response: AxiosResponse<ReadableUser> = await this.crudService.get(
                '/private/user-service/user/profile',
                undefined,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch (error) {
            console.error('[UserService] getProfile failed', error);
            return null;
        }
    }
}
