import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { profileActions } from '../../store/profile/profile.slice';
import {
  deleteAvatar,
  getUser,
  getUserComments,
  getUserPosts,
  getUserPostsLikes,
  updateAvatar,
  updateEmail,
  updatePassword,
  updateUserName
} from '../../store/profile/profile-actions';
import { getUsers } from '../../store/profile/admin-actions';

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
    getUserPostsLikes,
    getUserComments,
    getUsers
  };

  return bindActionCreators(actions, dispatch);
};
