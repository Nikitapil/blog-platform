import React from 'react';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostListItem } from './PostListItem';

export const PostList = () => {
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </div>
  );
};
