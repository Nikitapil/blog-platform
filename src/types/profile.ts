import { TPost, TPostComment } from './posts';

export type TProfileState = {
  user: TProfileUser | null;
  isUserLoading: boolean;
  isAvatarLoading: boolean;
  userPosts: TPost[];
  userPostsLikes: TPost[];
  userComments: TPostComment[];
  isUserPostsLoading: boolean;
  passwordError: string;
  usernameError: string;
  emailError: string;
};

export type TProfileUser = {
  userName: string;
  id: number;
  avatar: string;
};
