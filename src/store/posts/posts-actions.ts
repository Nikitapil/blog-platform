import { PostsService } from '../../services/PostsService';
import { postsSlice } from './posts.slice';
import { AppDispatch } from '../index';

export const getPosts = (page = 1, search = '') => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.setIsPostsLoading(true));
      const response = await PostsService.getPosts(page, search);
      dispatch(postsSlice.actions.setPosts(response.data.posts));
      dispatch(postsSlice.actions.setTotalCount(response.data.count));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(postsSlice.actions.setIsPostsLoading(false));
    }
  };
};

export const getSinglePost = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.setIsSinglePostLoading(true));
      dispatch(postsSlice.actions.setSinglePostError(''));
      const response = await PostsService.getSinglePost(id);
      dispatch(postsSlice.actions.setSinglePost(response.data));
      const likesResponse = await PostsService.getPostLikes(id);
      dispatch(postsSlice.actions.setPostLikes(likesResponse.data.rows));
    } catch (e: any) {
      dispatch(postsSlice.actions.setSinglePost(null));
      dispatch(postsSlice.actions.setSinglePostError(e.response.data.message));
    } finally {
      dispatch(postsSlice.actions.setIsSinglePostLoading(false));
    }
  };
};

export const addPostLike = (postId: number, userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.addPostLike(postId, userId);
      dispatch(postsSlice.actions.setPostLikes(response.data.rows));
    } catch (e) {
      console.error(e);
    }
  };
};

export const deletePostLike = (postId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.deletePostLike(postId);
      dispatch(postsSlice.actions.setPostLikes(response.data.rows));
    } catch (e) {
      console.error(e);
    }
  };
};
