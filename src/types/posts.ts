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
};
