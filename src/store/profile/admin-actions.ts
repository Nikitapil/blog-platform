import { toast } from 'react-toastify';
import { AppDispatch } from '../index';
import { ProfileService } from '../../services/ProfileService';
import { adminSlice } from './admin.slice';
import { TUserUiRole } from '../../types/auth-form';

export const getUsers = (page: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.getUsers(page);
      dispatch(adminSlice.actions.setUsers(response.data));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const banUser = (userId: number, banReason: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.banUser(userId, banReason);
      dispatch(adminSlice.actions.changeOneUser(response.data));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const unbanUser = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.unbanUser(userId);
      dispatch(adminSlice.actions.changeOneUser(response.data));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const changeUserRoles = (roles: TUserUiRole[], userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.changeRoles(roles, userId);
      dispatch(adminSlice.actions.changeOneUser(response.data));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const getRoles = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.getRoles();
      dispatch(adminSlice.actions.setRoles(response.data));
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };
};
