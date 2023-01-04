import { AxiosResponse } from 'axios';
import { TAllPostsResponse, TPost } from '../types/posts';
import $api from '../api/api';

export class PostsService {
  static async getPosts(page = 1): Promise<AxiosResponse<TAllPostsResponse>> {
    const response = await $api.get<TAllPostsResponse>('/posts', {
      params: { page }
    });
    return response;
  }

  static async getSinglePost(id: string): Promise<AxiosResponse<TPost>> {
    const response = await $api.get<TPost>(`/posts/${id}`);
    return response;
  }

  static async createPost(
    title: string,
    content: string,
    image: File | null,
    userId: string
  ) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('userId', userId);
    const response = await $api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }

  static async editPost(
    title: string,
    content: string,
    image: File | null,
    userId: string,
    id: number,
    imageName: string
  ) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('id', id.toString());
    formData.append('imageName', imageName);
    if (image) {
      formData.append('image', image);
    }
    formData.append('userId', userId);
    const response = await $api.put('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }

  static async deletePost(id: string) {
    const response = await $api.delete(`/posts/${id}`);
    return response;
  }
}
