import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
  addPostComment,
  addPostLike,
  deletePostComment,
  deletePostLike,
  editPostComment,
  getPosts,
  getSinglePost,
  getPostsWithLikes, getPostsWithViews
} from '../../store/posts/posts-actions';

export const usePostsActions = () => {
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
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
