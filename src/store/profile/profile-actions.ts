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
