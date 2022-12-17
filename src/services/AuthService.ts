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
}
