import { toast } from 'react-toastify';
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
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      dispatch(postsSlice.actions.setIsPostsLoading(false));
    }
  };
};

export const getPostsWithLikes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.setIsPostsWithLikesLoading(true));
      const response = await PostsService.getPostsWithLikes();
      dispatch(postsSlice.actions.setPostsWithLikes(response.data.posts));
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      dispatch(postsSlice.actions.setIsPostsWithLikesLoading(false));
    }
  };
};

export const getPostsWithViews = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.setIsPostsWithViewsLoading(true));
      const response = await PostsService.getPostsWithViews();
      dispatch(postsSlice.actions.setPostsWithViews(response.data.posts));
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      dispatch(postsSlice.actions.setIsPostsWithViewsLoading(false));
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
      const commentsResponse = await PostsService.getPostComments(id);
      dispatch(
        postsSlice.actions.setPostComments(commentsResponse.data.comments)
      );
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
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const deletePostLike = (postId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.deletePostLike(postId);
      dispatch(postsSlice.actions.setPostLikes(response.data.rows));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const addPostComment = (
  userId: number,
  postId: number,
  text: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.addComment({
        userId,
        postId,
        text
      });
      dispatch(postsSlice.actions.setPostComments(response.data.comments));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const editPostComment = (commentId: number, text: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.editPostComment(commentId, text);
      dispatch(postsSlice.actions.setPostComments(response.data.comments));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const deletePostComment = (commentId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.deleteComment(commentId);
      dispatch(postsSlice.actions.setPostComments(response.data.comments));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};
