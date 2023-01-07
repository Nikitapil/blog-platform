export type TPost = {
  id: number;
  title: string;
  content: string;
  image: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  likesCount: number;
};

export type TPostLike = {
  id: number;
  postId: number;
  userId: number;
};

export type TPostLikesResponse = {
  count: number;
  rows: TPostLike[];
};

export type TAllPostsResponse = {
  count: number;
  posts: TPost[];
};

export type PostsState = {
  posts: TPost[];
  singlePost: TPost | null;
  singlePostError: string;
  isPostsLoading: boolean;
  isSinglePostLoading: boolean;
  totalPostsCount: number;
  singlePostLikes: TPostLike[];
};

export type PostFormValues = {
  title: string;
  content: string;
};

export type TPostRequest = PostFormValues & {
  image: File | null;
  userId: string;
  id?: number;
  imageName?: string;
};
