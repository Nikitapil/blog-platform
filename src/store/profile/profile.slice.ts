import { createSlice } from '@reduxjs/toolkit';
import { TProfileState, TProfileUser } from '../../types/profile';
import { TReduxAction } from '../../types/common';
import { TPost } from '../../types/posts';

const initialState: TProfileState = {
  user: null,
  isUserLoading: false,
  isAvatarLoading: false,
  userPosts: [],
  isUserPostsLoading: false,
  passwordError: '',
  usernameError: ''
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setUser(state, action: TReduxAction<TProfileUser | null>) {
      state.user = action.payload;
    },
    setIsUserLoading(state, action: TReduxAction<boolean>) {
      state.isUserLoading = action.payload;
    },
    setIsAvatarLoading(state, action: TReduxAction<boolean>) {
      state.isAvatarLoading = action.payload;
    },
    setIsUserPostsLoading(state, action: TReduxAction<boolean>) {
      state.isUserPostsLoading = action.payload;
    },
    setUserPosts(state, action: TReduxAction<TPost[]>) {
      state.userPosts = action.payload;
    },
    setPasswordError(state, action: TReduxAction<string>) {
      state.passwordError = action.payload;
    },
    setUsernameError(state, action: TReduxAction<string>) {
      state.usernameError = action.payload;
    }
  }
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
