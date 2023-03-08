import { createSlice } from '@reduxjs/toolkit';
import { TAuthStore, TUser } from '../../types/auth-form';
import { TReduxAction } from '../../types/common';
import { EAuthRoles } from '../../constants/auth-constants';

const initialState: TAuthStore = {
  isAuthLoading: true,
  user: null,
  signError: ''
};

export const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    setIsAuthLoading(state, action: TReduxAction<boolean>) {
      state.isAuthLoading = action.payload;
    },
    setUser(state, action: TReduxAction<TUser | null>) {
      const isAdmin = !!action.payload?.roles.find(
        (role) => role.value === EAuthRoles.ADMIN
      );
      state.user = action.payload ? { ...action.payload, isAdmin } : null;
    },
    setSignError(state, action: TReduxAction<string>) {
      state.signError = action.payload;
    }
  }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
