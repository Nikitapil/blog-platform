import { TPost } from './posts';

export type TProfileState = {
  user: TProfileUser | null;
  isUserLoading: boolean;
  isAvatarLoading: boolean;
  userPosts: TPost[];
  isUserPostsLoading: boolean;
};

export type TProfileUser = {
  userName: string;
  id: number;
};
