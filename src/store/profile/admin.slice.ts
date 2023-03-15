import { createSlice } from '@reduxjs/toolkit';
import { TAdminInitialState, TAdminUserDto } from '../../types/admin';
import { TReduxAction } from '../../types/common';
import { TUserRole } from '../../types/auth-form';

const initialState: TAdminInitialState = {
  users: [],
  roles: []
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    setUsers(state, action: TReduxAction<TAdminUserDto[]>) {
      state.users = action.payload;
    },

    changeOneUser(state, action: TReduxAction<TAdminUserDto>) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },

    setRoles(state, action: TReduxAction<TUserRole[]>) {
      state.roles = action.payload;
    }
  }
});

export const adminReducer = adminSlice.reducer;
