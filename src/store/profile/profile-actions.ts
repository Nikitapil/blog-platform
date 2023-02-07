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
      dispatch(profileSlice.actions.setUsernameError(''));
      const response = await ProfileService.updateUsername(userName);
      dispatch(authSlice.actions.setUser(response.data));
      dispatch(
        profileSlice.actions.setUser({
          id: response.data.id,
          userName: response.data.userName,
          avatar: response.data.avatar
        })
      );
    } catch (e: any) {
      const error = e.response.data[0] || e.response.data.message;
      dispatch(profileSlice.actions.setUsernameError(error));
    }
  };
};

export const updatePassword = (oldPassword: string, newPassword: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setPasswordError(''));
      const response = await ProfileService.updatePassword(
        oldPassword,
        newPassword
      );
      dispatch(authSlice.actions.setUser(response.data));
    } catch (e: any) {
      const error = e.response.data[0] || e.response.data.message;
      dispatch(profileSlice.actions.setPasswordError(error));
    }
  };
};

export const updateEmail = (email: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setEmailError(''));
      const response = await ProfileService.updateEmail(email);
      console.log(response.data);
      dispatch(authSlice.actions.setUser(response.data));
    } catch (e: any) {
      const error = e.response.data[0] || e.response.data.message;
      dispatch(profileSlice.actions.setEmailError(error));
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

export const getUserPostsLikes = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setIsUserPostsLoading(true));
      const response = await ProfileService.getPostsByUserLikes(id);
      dispatch(profileSlice.actions.setUserPostsLikes(response.data.posts));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(profileSlice.actions.setIsUserPostsLoading(false));
    }
  };
};

export const getUserComments = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.getCommentsByUser(id);
      dispatch(profileSlice.actions.setUserComments(response.data.comments));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUser = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(profileSlice.actions.setIsUserLoading(true));
      const response = await ProfileService.getUser(id);
      dispatch(profileSlice.actions.setUser(response.data));
    } catch (e) {
      dispatch(profileSlice.actions.setUser(null));
      console.log(e);
    } finally {
      dispatch(profileSlice.actions.setIsUserLoading(false));
    }
  };
};
