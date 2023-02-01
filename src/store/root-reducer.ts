import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.slice';
import { postsReducer } from './posts/posts.slice';
import { profileReducer } from './profile/profile.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  profile: profileReducer
});
