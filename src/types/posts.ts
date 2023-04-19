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
  viewsCount: number;
  commentsCount: number;
  userAvatar: string;
  hashtags: string[];
};

export type TPostLike = {
  id: number;
  postId: number;
  userId: number;
};

export type TPostComment = {
  id: number;
  text: string;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  userAvatar: string;
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
  postsWithLikes: TPost[];
  postsWithViews: TPost[];
  singlePost: TPost | null;
  singlePostError: string;
  isPostsLoading: boolean;
  isPostsWithLikesLoading: boolean;
  isPostsWithViewsLoading: boolean;
  isSinglePostLoading: boolean;
  totalPostsCount: number;
  singlePostLikes: TPostLike[];
  singlePostComments: TPostComment[];
};

export type PostFormValues = {
  title: string;
  content: string;
};

export type TPostRequest = PostFormValues & {
  image: File | null;
  tags: string[];
  id?: number;
  imageName?: string;
};

export type AddCommentDto = {
  userId: number;
  postId: number;
  text: string;
};

export type TPostCommentsResponse = {
  count: number;
  comments: TPostComment[];
};
