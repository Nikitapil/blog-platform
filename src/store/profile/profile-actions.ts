import axios from 'axios';
import { AppDispatch } from '../index';
import { ProfileService } from '../../services/ProfileService';
import { authSlice } from '../auth/auth.slice';
import { profileSlice } from './profile.slice';

export const updateAvatar = (image: File) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setIsAvatarLoading(true));
      const response = await ProfileService.updateAvatar(image);
      await axios.get(
        `${process.env.REACT_APP_API_URL}/${response.data.avatar}`
      );
      dispatch(authSlice.actions.setUser(response.data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(profileSlice.actions.setIsAvatarLoading(false));
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setIsAvatarLoading(true));
      const response = await ProfileService.deleteAvatar();
      dispatch(authSlice.actions.setUser(response.data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(profileSlice.actions.setIsAvatarLoading(false));
    }
  };
};

export const updateUserName = (userName: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.updateUsername(userName);
      dispatch(authSlice.actions.setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updatePassword = (oldPassword: string, newPassword: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.updatePassword(
        oldPassword,
        newPassword
      );
      dispatch(authSlice.actions.setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUserPosts = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setIsUserPostsLoading(true));
      const response = await ProfileService.getPostsByUserId(id);
      dispatch(profileSlice.actions.setUserPosts(response.data.posts));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(profileSlice.actions.setIsUserPostsLoading(false));
    }
  };
};

export const getUser = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setIsUserLoading(true));
      const response = await ProfileService.getUser(id);
      dispatch(profileSlice.actions.setUser(response.data));
      console.log(response);
    } catch (e) {
      dispatch(profileSlice.actions.setUser(null));
      console.log(e);
    } finally {
      dispatch(profileSlice.actions.setIsUserLoading(false));
    }
  };
};
