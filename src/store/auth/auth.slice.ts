import { createSlice } from '@reduxjs/toolkit';
import { TAuthStore } from '../../types/auth-form';

const initialState: TAuthStore = {
  isAuthLoading: true,
  user: null,
  signError: ''
};

export const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    setIsAuthLoading(state, action) {
      state.isAuthLoading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setSignError(state, action) {
      state.signError = action.payload;
    }
  }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
