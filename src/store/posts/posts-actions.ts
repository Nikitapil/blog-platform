import { PostsService } from '../../services/PostsService';
import { postsSlice } from './posts.slice';
import { AppDispatch } from '../index';

export const getPosts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.getPosts();
      dispatch(postsSlice.actions.setPosts(response.data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const getSinglePost = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.setSinglePostError(''));
      const response = await PostsService.getSinglePost(id);
      dispatch(postsSlice.actions.setSinglePost(response.data));
    } catch (e: any) {
      dispatch(postsSlice.actions.setSinglePost(null));
      dispatch(postsSlice.actions.setSinglePostError(e.response.data.message));
    }
  };
};
