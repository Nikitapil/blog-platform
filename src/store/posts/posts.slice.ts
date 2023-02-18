/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { PostsState, TPost, TPostComment, TPostLike } from '../../types/posts';
import { TReduxAction } from '../../types/common';

const initialState: PostsState = {
  posts: [],
  postsWithLikes: [],
  postsWithViews: [],
  isPostsLoading: false,
  isPostsWithLikesLoading: false,
  isPostsWithViewsLoading: false,
  singlePost: null,
  singlePostError: '',
  isSinglePostLoading: false,
  singlePostLikes: [],
  singlePostComments: [],
  totalPostsCount: 0
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPosts(state, action: TReduxAction<TPost[]>) {
      state.posts = action.payload;
    },
    setPostsWithLikes(state, action: TReduxAction<TPost[]>) {
      state.postsWithLikes = action.payload;
    },
    setPostsWithViews(state, action: TReduxAction<TPost[]>) {
      state.postsWithViews = action.payload;
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
    setIsPostsWithLikesLoading(state, action: TReduxAction<boolean>) {
      state.isPostsWithLikesLoading = action.payload;
    },
    setIsPostsWithViewsLoading(state, action: TReduxAction<boolean>) {
      state.isPostsWithViewsLoading = action.payload;
    },
    setIsSinglePostLoading(state, action: TReduxAction<boolean>) {
      state.isSinglePostLoading = action.payload;
    },
    setTotalCount(state, action: TReduxAction<number>) {
      state.totalPostsCount = action.payload;
    },
    setPostLikes(state, action: TReduxAction<TPostLike[]>) {
      state.singlePostLikes = action.payload;
    },
    setPostComments(state, action: TReduxAction<TPostComment[]>) {
      state.singlePostComments = action.payload;
    }
  }
});

export const postsReducer = postsSlice.reducer;
