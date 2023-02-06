import { TPost } from './posts';

export type TProfileState = {
  user: TProfileUser | null;
  isUserLoading: boolean;
  isAvatarLoading: boolean;
  userPosts: TPost[];
  userPostsLikes: TPost[];
  isUserPostsLoading: boolean;
  passwordError: string;
  usernameError: string;
  emailError: string;
};

export type TProfileUser = {
  userName: string;
  id: number;
};
