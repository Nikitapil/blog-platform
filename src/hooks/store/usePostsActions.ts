import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  addPostComment,
  addPostLike,
  deletePostComment,
  deletePostLike,
  editPostComment,
  getPosts,
  getSinglePost,
  getPostsWithLikes,
  getPostsWithViews
} from '../../store/posts/posts-actions';

export const usePostsActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const actions = {
      getPosts,
      getSinglePost,
      addPostLike,
      deletePostLike,
      addPostComment,
      editPostComment,
      deletePostComment,
      getPostsWithLikes,
      getPostsWithViews
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
