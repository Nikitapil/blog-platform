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
    page: number,
    search: string,
    tag?: string
  ): Promise<AxiosResponse<TAllPostsResponse>> {
    return $api.get<TAllPostsResponse>('/posts', {
      params: { page, search, tag }
    });
  }

  static async getPostsWithLikes(): Promise<AxiosResponse<TAllPostsResponse>> {
    return $api.get<TAllPostsResponse>('/posts/posts_by_like');
  }

  static async getPostsWithViews(): Promise<AxiosResponse<TAllPostsResponse>> {
    return $api.get<TAllPostsResponse>('/posts/posts_by_views');
  }

  static async getSinglePost(id: string): Promise<AxiosResponse<TPost>> {
    return $api.get<TPost>(`/posts/${id}`);
  }

  static async createPost({
    title,
    content,
    image,
    tags
  }: TPostRequest): Promise<AxiosResponse<TPost>> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    tags.forEach((tag) => {
      formData.append('hashtags', tag);
    });
    return $api.post<TPost>('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async editPost({
    title,
    content,
    image,
    id,
    imageName,
    tags
  }: TPostRequest): Promise<AxiosResponse<TPost>> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('id', id!.toString());
    formData.append('imageName', imageName!);
    if (image) {
      formData.append('image', image);
    }

    tags.forEach((tag) => {
      formData.append('hashtags', tag);
    });

    return $api.put<TPost>('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async deletePost(id: string): Promise<AxiosResponse<null>> {
    return $api.delete<null>(`/posts/${id}`);
  }

  static async getPostLikes(
    id: string
  ): Promise<AxiosResponse<TPostLikesResponse>> {
    return $api.get<TPostLikesResponse>(`/posts/like/${id}`);
  }

  static async addPostLike(
    postId: number,
    userId: number
  ): Promise<AxiosResponse<TPostLikesResponse>> {
    return $api.post<TPostLikesResponse>('/posts/like', {
      postId,
      userId
    });
  }

  static async deletePostLike(
    postId: number
  ): Promise<AxiosResponse<TPostLikesResponse>> {
    return $api.delete<TPostLikesResponse>(`/posts/like/${postId}`);
  }

  static async addComment(
    request: AddCommentDto
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    return $api.post<TPostCommentsResponse>('/posts/comment', request);
  }

  static async getPostComments(
    postId: string
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    return $api.get<TPostCommentsResponse>(`/posts/comment/${postId}`);
  }

  static async editPostComment(
    commentId: number,
    text: string
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    return $api.put<TPostCommentsResponse>('/posts/comment', {
      id: commentId,
      text
    });
  }

  static async deleteComment(
    commentId: number
  ): Promise<AxiosResponse<TPostCommentsResponse>> {
    return $api.delete<TPostCommentsResponse>(`/posts/comment/${commentId}`);
  }
}
