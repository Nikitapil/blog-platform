/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  TAdminAllUsersResponse,
  TAdminInitialState,
  TAdminUserDto
} from '../../types/admin';
import { TReduxAction } from '../../types/common';
import { TUserRole } from '../../types/auth-form';

const initialState: TAdminInitialState = {
  users: [],
  roles: [],
  usersCount: 0
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
    setUsers(state, action: TReduxAction<TAdminAllUsersResponse>) {
      state.users = action.payload.users;
      state.usersCount = action.payload.count;
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
