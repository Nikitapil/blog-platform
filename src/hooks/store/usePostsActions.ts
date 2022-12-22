import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { getPosts, getSinglePost } from '../../store/posts/posts-actions';

export const usePostsActions = () => {
  const actions = {
    getPosts,
    getSinglePost
  };
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
