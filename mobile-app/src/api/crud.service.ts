import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import { CountryEntity as Country } from '@ui/shared-models';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class CrudService {
  private api: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL || '') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getBaseUrl(): string {
    return this.api.defaults.baseURL || '';
  }

  get<T = any>(path: string, params?: Record<string, string | string[]>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(path, { params, ...config });
  }

  getWithEmpty<T = any>(path: string, params?: Record<string, string | string[]>): Promise<T | null> {
    return this.api.get<T>(path, { params })
      .then(res => res.data)
      .catch(err => {
        console.error(`[GET withEmpty] ${path}`, err);
        return null;
      });
  }

  post<T = any>(path: string, body: any = null, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(path, body, config);
  }

  postWithStoreParam<T = any>(path: string, body: any = null, storeCode?: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    if (storeCode) {
      path += path.includes('?') ? `&store=${storeCode}` : `?store=${storeCode}`;
    }
    return this.api.post<T>(path, body, config);
  }

  patch<T = any>(path: string, body: any = null, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(path, body, config);
  }

  put<T = any>(path: string, body: any = null, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(path, body, config);
  }

  delete<T = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(path, config);
  }

  listCountriesByLanguage(lang: string): Promise<Country[]> {
    const path = `/v1/country?lang=${lang}`;
    return this.api.get<Country[]>(path)
      .then(res => res.data);
  }
}
