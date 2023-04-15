import { RootState } from './index';

export const authSelector = (state: RootState) => state.auth;
export const adminSelector = (state: RootState) => state.admin;
export const profileSelector = (state: RootState) => state.profile;
