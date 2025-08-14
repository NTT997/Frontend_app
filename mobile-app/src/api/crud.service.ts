import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Constants from "expo-constants";
import { CountryEntity as Country } from "@ui/shared-models";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class CrudService {
  private api: AxiosInstance;

  constructor(baseURL: string = "http://localhost:8085") {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getBaseUrl(): string {
    return "http://localhost:8085";
    // return this.api.defaults.baseURL || "";
  }

  get<T = any>(
    path: string,
    params?: Record<string, string | string[]>,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const axiosConfig: AxiosRequestConfig = { ...config };
    if (params) {
      axiosConfig.params = params;
    }
    return this.api.get<T>(path, axiosConfig);
  }

  getWithEmpty<T = any>(
    path: string,
    params?: Record<string, string | string[]>
  ): Promise<T | null> {
    return this.api
      .get<T>(path, { params })
      .then((res) => res.data)
      .catch((err) => {
        console.error(`[GET withEmpty] ${path}`, err);
        return null;
      });
  }

  post<T = any>(
    path: string,
    body: any = null,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    console.log("Sending POST to", this.api.defaults.baseURL + path);
    return this.api.post<T>(path, body, config);
  }

  postWithStoreParam<T = any>(
    path: string,
    body: any = null,
    storeCode?: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    if (storeCode) {
      path += path.includes("?")
        ? `&store=${storeCode}`
        : `?store=${storeCode}`;
    }
    return this.api.post<T>(path, body, config);
  }

  patch<T = any>(
    path: string,
    body: any = null,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(path, body, config);
  }

  put<T = any>(
    path: string,
    body: any = null,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.put<T>(path, body, config);
  }

  delete<T = any>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(path, config);
  }

  listCountriesByLanguage(lang: string): Promise<Country[]> {
    const path = `/v1/country?lang=${lang}`;
    return this.api.get<Country[]>(path).then((res) => res.data);
  }
}
