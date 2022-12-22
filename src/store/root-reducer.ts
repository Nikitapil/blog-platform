import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.slice';
import { postsReducer } from './posts/posts.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer
});
