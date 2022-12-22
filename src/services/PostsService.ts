import { AxiosResponse } from 'axios';
import { TPost } from '../types/posts';
import $api from '../api/api';

export class PostsService {
  static async getPosts(): Promise<AxiosResponse<TPost[]>> {
    const response = await $api.get<TPost[]>('/posts');
    return response;
  }

  static async getSinglePost(id: string): Promise<AxiosResponse<TPost>> {
    const response = await $api.get<TPost>(`/posts/${id}`);
    return response;
  }
}
