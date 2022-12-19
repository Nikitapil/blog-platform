import { AxiosResponse } from 'axios';
import { AuthFormData, TAuthResponse } from '../types/auth-form';
import $api from '../api/api';

export class AuthService {
  static async registration(
    formValues: AuthFormData
  ): Promise<AxiosResponse<TAuthResponse>> {
    const response = await $api.post<TAuthResponse>(
      '/auth/registration',
      formValues
    );
    return response;
  }

  static async login(
    formValues: AuthFormData
  ): Promise<AxiosResponse<TAuthResponse>> {
    const response = await $api.post<TAuthResponse>('/auth/login', formValues);
    return response;
  }

  static async checkAuth(): Promise<AxiosResponse<TAuthResponse>> {
    const response = await $api.get<TAuthResponse>('/auth/refresh');
    return response;
  }

  static async logout() {
    await $api.get('/auth/logout');
  }
}
