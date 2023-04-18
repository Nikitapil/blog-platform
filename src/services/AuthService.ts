import { AxiosResponse } from 'axios';
import { AuthFormData, TAuthResponse } from '../types/auth-form';
import $api from '../api/api';

export class AuthService {
  static async registration(
    formValues: AuthFormData
  ): Promise<AxiosResponse<TAuthResponse>> {
    return $api.post<TAuthResponse>('/auth/registration', formValues);
  }

  static async login(
    formValues: AuthFormData
  ): Promise<AxiosResponse<TAuthResponse>> {
    return $api.post<TAuthResponse>('/auth/login', formValues);
  }

  static async checkAuth(): Promise<AxiosResponse<TAuthResponse>> {
    return $api.get<TAuthResponse>('/auth/refresh');
  }

  static async logout() {
    await $api.get('/auth/logout');
  }
}
