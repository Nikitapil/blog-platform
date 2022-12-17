import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.slice';

export const rootReducer = combineReducers({
  auth: authReducer
});
