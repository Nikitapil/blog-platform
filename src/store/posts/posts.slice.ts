import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types/posts';

const initialState: PostsState = {
  posts: [],
  singlePost: null,
  singlePostError: ''
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
    }
  }
});

export const postsReducer = postsSlice.reducer;
