import { createSlice } from '@reduxjs/toolkit';
import { TAdminInitialState, TAdminUserDto } from '../../types/admin';
import { TReduxAction } from '../../types/common';

const initialState: TAdminInitialState = {
  users: []
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
    }
  }
});

export const adminReducer = adminSlice.reducer;
