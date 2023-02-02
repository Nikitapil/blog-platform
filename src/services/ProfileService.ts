import { AxiosResponse } from 'axios';
import $api from '../api/api';
import { TUser } from '../types/auth-form';

export class ProfileService {
  static async updateAvatar(image: File): Promise<AxiosResponse<TUser>> {
    const formData = new FormData();
    formData.append('image', image);
    return $api.post<TUser>('/users/update-avatar', formData);
  }
}
