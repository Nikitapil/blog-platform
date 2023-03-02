import { toast } from 'react-toastify';
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
      toast.success(`Welcome ${response.data.user.userName}`);
    } catch (e: any) {
      dispatch(authSlice.actions.setSignError(e?.response?.data?.message));
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
      toast.success(`Welcome ${response.data.user.userName}`);
    } catch (e: any) {
      dispatch(authSlice.actions.setSignError(e?.response?.data?.message));
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};

export const checkAuth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      const response = await AuthService.checkAuth();
      localStorage.setItem('token', response.data.accessToken);
      dispatch(authSlice.actions.setUser(response.data.user));
    } catch (e: any) {
      dispatch(authSlice.actions.setUser(null));
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setIsAuthLoading(true));
      await AuthService.logout();
      localStorage.removeItem('token');
      dispatch(authSlice.actions.setUser(null));
      toast.warning('Logged out! Bye!');
    } catch (e: any) {
      toast.error(e.response.data.message);
    } finally {
      dispatch(authSlice.actions.setIsAuthLoading(false));
    }
  };
};
