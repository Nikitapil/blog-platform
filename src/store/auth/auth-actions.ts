import { AuthFormData } from '../../types/auth-form';
import { AppDispatch } from '../index';
import { authSlice } from './auth.slice';
import { AuthService } from '../../services/AuthService';

export const registration = (formValues: AuthFormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      const response = await AuthService.registration(formValues);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(authSlice.actions.setUser(response.data.user));
    } catch (e: any) {
      dispatch(authSlice.actions.setSignError(e?.response?.data?.message));
      console.error(e);
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};

export const login = (formValues: AuthFormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      const response = await AuthService.login(formValues);
      localStorage.setItem('token', response.data.accessToken);
      dispatch(authSlice.actions.setUser(response.data.user));
    } catch (e: any) {
      dispatch(authSlice.actions.setSignError(e?.response?.data?.message));
      console.error(e);
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};