import { TPost } from './posts';

export type TProfileState = {
  user: TProfileUser | null;
  isUserLoading: boolean;
  isAvatarLoading: boolean;
  userPosts: TPost[];
  isUserPostsLoading: boolean;
  passwordError: string;
  usernameError: string;
};

export type TProfileUser = {
  userName: string;
  id: number;
};
