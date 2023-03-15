import { toast } from 'react-toastify';
import { AppDispatch } from '../index';
import { ProfileService } from '../../services/ProfileService';
import { adminSlice } from './admin.slice';

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await ProfileService.getUsers();
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
