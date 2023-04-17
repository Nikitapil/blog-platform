import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useMemo } from 'react';
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
import {
  banUser,
  changeUserRoles,
  getRoles,
  getUsers,
  unbanUser
} from '../../store/profile/admin-actions';

export const useProfileActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
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
      getUsers,
      banUser,
      unbanUser,
      getRoles,
      changeUserRoles
    };
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
