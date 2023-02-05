import { createSlice } from '@reduxjs/toolkit';
import { TProfileState } from '../../types/profile';
import { TReduxAction } from '../../types/common';
import { TPost } from '../../types/posts';

const initialState: TProfileState = {
  profileName: '',
  isAvatarLoading: false,
  userPosts: [],
  isUserPostsLoading: false
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfileName(state, action: TReduxAction<string>) {
      state.profileName = action.payload;
    },
    setIsAvatarLoading(state, action: TReduxAction<boolean>) {
      state.isAvatarLoading = action.payload;
    },
    setIsUserPostsLoading(state, action: TReduxAction<boolean>) {
      state.isUserPostsLoading = action.payload;
    },
    setUserPosts(state, action: TReduxAction<TPost[]>) {
      state.userPosts = action.payload;
    }
  }
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;
