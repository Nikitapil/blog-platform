import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
  addPostComment,
  addPostLike,
  deletePostLike,
  getPosts,
  getSinglePost
} from '../../store/posts/posts-actions';

export const usePostsActions = () => {
  const actions = {
    getPosts,
    getSinglePost,
    addPostLike,
    deletePostLike,
    addPostComment
  };
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
