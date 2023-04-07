import { AxiosResponse } from 'axios';
import {
  AddCommentDto,
  TAllPostsResponse,
  TPost,
  TPostCommentsResponse,
  TPostLikesResponse,
  TPostRequest
} from '../types/posts';
import $api from '../api/api';

export class PostsService {
  static async getPosts(
    page = 1,
    search: string
  ): Promise<AxiosResponse<TAllPostsResponse>> {
    const response = await $api.get<TAllPostsResponse>('/posts', {
      params: { page, search }
    });
    return response;
  }

  static async getPostsWithLikes(): Promise<AxiosResponse<TAllPostsResponse>> {
    const response = await $api.get<TAllPostsResponse>('/posts/posts_by_like');
    return response;
  }

  static async getPostsWithViews(): Promise<AxiosResponse<TAllPostsResponse>> {
    const response = await $api.get<TAllPostsResponse>('/posts/posts_by_views');
    return response;
  }

  static async getSinglePost(id: string): Promise<AxiosResponse<TPost>> {
    const response = await $api.get<TPost>(`/posts/${id}`);
    return response;
  }

  static async createPost({
    title,
    content,
    image,
    userId,
    tags
  }: TPostRequest) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('userId', userId);
    tags.forEach((tag) => {
      formData.append('hashtags', tag);
    });
    const response = await $api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }

  static async editPost({
    title,
    content,
    image,
    userId,
    id,
    imageName,
    tags
  }: TPostRequest) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('id', id!.toString());
    formData.append('imageName', imageName!);
    if (image) {
      formData.append('image', image);
    }
    formData.append('userId', userId);

    tags.forEach((tag) => {
      formData.append('hashtags', tag);
    });

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

  static async getPostLikes(
    id: string
  ): Promise<AxiosResponse<TPostLikesResponse>> {
    const response = await $api.get<TPostLikesResponse>(`/posts/like/${id}`);
    return response;
  }

  static async addPostLike(
    postId: number,
    userId: number
  ): Promise<AxiosResponse<TPostLikesResponse>> {
    const response = await $api.post<TPostLikesResponse>('/posts/like', {
      postId,
      userId
    });
    return response;
  }

  static async deletePostLike(
    postId: number
  ): Promise<AxiosResponse<TPostLikesResponse>> {
    const response = await $api.delete<TPostLikesResponse>(
      `/posts/like/${postId}`
    );
    return response;
  }

  static async addComment(
    request: AddCommentDto
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    const response = await $api.post<TPostCommentsResponse>(
      '/posts/comment',
      request
    );
    return response;
  }

  static async getPostComments(
    postId: string
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    const response = await $api.get<TPostCommentsResponse>(
      `/posts/comment/${postId}`
    );
    return response;
  }

  static async editPostComment(
    commentId: number,
    text: string
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    const response = await $api.put<TPostCommentsResponse>('/posts/comment', {
      id: commentId,
      text
    });
    return response;
  }

  static async deleteComment(
    commentId: number
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    const response = await $api.delete<TPostCommentsResponse>(
      `/posts/comment/${commentId}`
    );
    return response;
  }
}
