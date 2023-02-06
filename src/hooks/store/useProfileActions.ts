import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { profileActions } from '../../store/profile/profile.slice';
import {
  deleteAvatar,
  getUser,
  getUserPosts,
  getUserPostsLikes,
  updateAvatar,
  updateEmail,
  updatePassword,
  updateUserName
} from '../../store/profile/profile-actions';

export const useProfileActions = () => {
  const dispatch = useDispatch();
  const actions = {
    ...profileActions,
    updateAvatar,
    deleteAvatar,
    updateUserName,
    updatePassword,
    getUserPosts,
    getUser,
    updateEmail,
    getUserPostsLikes
  };

  return bindActionCreators(actions, dispatch);
};
