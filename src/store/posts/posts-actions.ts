import { PostsService } from '../../services/PostsService';
import { postsSlice } from './posts.slice';
import { AppDispatch } from '../index';

export const getPosts = (page = 1) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.setIsPostsLoading(true));
      const response = await PostsService.getPosts(page);
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
    } catch (e: any) {
      dispatch(postsSlice.actions.setSinglePost(null));
      dispatch(postsSlice.actions.setSinglePostError(e.response.data.message));
    } finally {
      dispatch(postsSlice.actions.setIsSinglePostLoading(false));
    }
  };
};
