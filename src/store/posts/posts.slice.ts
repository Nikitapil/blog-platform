import { createSlice } from '@reduxjs/toolkit';
import { PostsState } from '../../types/posts';

const initialState: PostsState = {
  posts: []
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {}
});
