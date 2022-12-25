export type TPost = {
  id: number;
  title: string;
  content: string;
  image: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  author: string;
};

export type PostsState = {
  posts: TPost[];
  singlePost: TPost | null;
  singlePostError: string;
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
