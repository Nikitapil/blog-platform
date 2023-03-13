import { AxiosResponse } from 'axios';
import $api from '../api/api';
import { TUser } from '../types/auth-form';
import { TAllPostsResponse, TPostCommentsResponse } from '../types/posts';
import { TProfileUser } from '../types/profile';
import { TAdminUserDto } from '../types/admin';

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

  static async updateEmail(email: string): Promise<AxiosResponse<TUser>> {
    return $api.put<TUser>('/users/update-email', { email });
  }

  static async getPostsByUserId(
    userId: string
  ): Promise<AxiosResponse<TAllPostsResponse>> {
    return $api.get<TAllPostsResponse>(`/posts/user/${userId}`);
  }

  static async getPostsByUserLikes(
    userId: string
  ): Promise<AxiosResponse<TAllPostsResponse>> {
    return $api.get<TAllPostsResponse>(`/posts/user/likes/${userId}`);
  }

  static async getCommentsByUser(
    userId: string
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    return $api.get<TPostCommentsResponse>(`/posts/comment/user/${userId}`);
  }

  static async getUser(userId: string): Promise<AxiosResponse<TProfileUser>> {
    return $api.get<TProfileUser>(`/users/${userId}`);
  }

  static async getUsers(): Promise<AxiosResponse<TAdminUserDto[]>> {
    return $api.get<TAdminUserDto[]>('/users');
  }

  static async banUser(
    userId: number,
    banReason: string
  ): Promise<AxiosResponse<TAdminUserDto>> {
    return $api.post<TAdminUserDto>('/users/ban', { userId, banReason });
  }

  static async unbanUser(
    userId: number
  ): Promise<AxiosResponse<TAdminUserDto>> {
    return $api.post<TAdminUserDto>('/users/unban', { userId });
  }
}
