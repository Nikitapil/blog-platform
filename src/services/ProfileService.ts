import { AxiosResponse } from 'axios';
import $api from '../api/api';
import { TUser } from '../types/auth-form';

export class ProfileService {
  static async updateAvatar(image: File): Promise<AxiosResponse<TUser>> {
    const formData = new FormData();
    formData.append('image', image);
    return $api.post<TUser>('/users/update-avatar', formData);
  }

  static async deleteAvatar(): Promise<AxiosResponse<TUser>> {
    return $api.delete<TUser>('/users/delete-avatar');
  }

  static async updateUsername(userName: string): Promise<AxiosResponse<TUser>> {
    return $api.put<TUser>('/users/update-userName', { userName });
  }

  static async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<AxiosResponse<TUser>> {
    return $api.put<TUser>('/users/update-password', {
      oldPassword,
      newPassword
    });
  }
}
