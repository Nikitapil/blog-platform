import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types/posts';

const initialState: PostsState = {
  posts: [],
  isPostsLoading: false,
  singlePost: null,
  singlePostError: '',
  isSinglePostLoading: false
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSinglePost(state, action) {
      state.singlePost = action.payload;
    },
    setSinglePostError(state, action) {
      state.singlePostError = action.payload;
    },
    setIsPostsLoading(state, action) {
      state.isPostsLoading = action.payload;
    },
    setIsSinglePostLoading(state, action) {
      state.isSinglePostLoading = action.payload;
    }
  }
});

export const postsReducer = postsSlice.reducer;
