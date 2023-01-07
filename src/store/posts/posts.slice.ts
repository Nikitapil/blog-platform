/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PostsState, TPost, TPostLike } from '../../types/posts';
import { TReduxAction } from '../../types/common';

const initialState: PostsState = {
  posts: [],
  isPostsLoading: false,
  singlePost: null,
  singlePostError: '',
  isSinglePostLoading: false,
  singlePostLikes: [],
  totalPostsCount: 0
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPosts(state, action: TReduxAction<TPost[]>) {
      state.posts = action.payload;
    },
    setSinglePost(state, action: TReduxAction<TPost | null>) {
      state.singlePost = action.payload;
    },
    setSinglePostError(state, action: TReduxAction<string>) {
      state.singlePostError = action.payload;
    },
    setIsPostsLoading(state, action: TReduxAction<boolean>) {
      state.isPostsLoading = action.payload;
    },
    setIsSinglePostLoading(state, action: TReduxAction<boolean>) {
      state.isSinglePostLoading = action.payload;
    },
    setTotalCount(state, action: TReduxAction<number>) {
      state.totalPostsCount = action.payload;
    },
    setPostLikes(state, action: TReduxAction<TPostLike[]>) {
      state.singlePostLikes = action.payload;
    }
  }
});

export const postsReducer = postsSlice.reducer;
