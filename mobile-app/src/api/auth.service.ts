import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosResponse } from 'axios';
import { CrudService } from './crud.service';
import { AuthResponse } from '../types/authResponse';
import { ReadableUser } from '@ui/shared-models';
import Constant from '../utils/constant';
import store from '@/redux/store';
import { getLocalData, removeLocalData } from '@/utils/helper';

// export interface AuthResponse {
//   token: string;
//   refreshToken?: string;
//   expiresIn?: number;
//   // Add any other fields returned by your API
// }

export class AuthService {
  private crudService: CrudService;
  private tokenKey = Constant.AUTH_TOKEN;
  private userIdKey = Constant.USER_ID;
  private userProfile = Constant.USER_PROFILE;

  constructor(crudService?: CrudService) {
    this.crudService = crudService ?? new CrudService();
  }

  async login(data: { username: string; password: string }): Promise<AuthResponse | null> {
    try {

      const response: AxiosResponse<AuthResponse> = await this.crudService.post<AuthResponse>(
        '/user/login',
        data
      );

      const authData = response.data;

      if (authData != null) {
        await AsyncStorage.multiRemove([this.tokenKey, this.userIdKey, this.userProfile]);
        await AsyncStorage.setItem(this.tokenKey, authData.token);
        await AsyncStorage.setItem(this.userIdKey, authData.id.toString());
        const profile = await this.findById(authData.id);
        await AsyncStorage.setItem(this.userProfile, JSON.stringify(profile));
      }

      return authData;
    } catch (error) {
      console.error('[AuthService] Login failed', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.tokenKey);
      await AsyncStorage.removeItem(this.userIdKey);
      // You can also call an API endpoint for server-side logout if required.
    } catch (error) {
      console.warn('[AuthService] Logout error', error);
    }
  }

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.tokenKey);
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  async getCurrentUser(): Promise<AuthResponse | null> {
    const json = await AsyncStorage.getItem(this.userIdKey);
    return json ? JSON.parse(json) : null;
  }

  async findById(id: number): Promise<ReadableUser | null> {
    try {
      const token = getLocalData(this.tokenKey);
      if (!token) throw new Error('No auth token found');

      const response: AxiosResponse<ReadableUser> = await this.crudService.get(
        `/private/user-service/users/${id}`,
        undefined,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      console.error('[AuthService] Find user by ID failed', error);
      return null;
    }
  }
}
