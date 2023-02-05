import { TPost } from './posts';

export type TProfileState = {
  profileName: string;
  isAvatarLoading: boolean;
  userPosts: TPost[];
  isUserPostsLoading: boolean;
};
