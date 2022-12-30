import React from 'react';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostListItem } from './PostListItem';
import { HorizontalLoader } from '../ui/loaders/HorizontalLoader';

export const PostList = () => {
  const { posts, isPostsLoading } = useAppSelector((state) => state.posts);
  return (
    <div>
      {isPostsLoading && <HorizontalLoader />}
      {posts.length === 0 && !isPostsLoading && (
        <p className="font-m">No posts yet, create first one</p>
      )}
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </div>
  );
};
