import React from 'react';
import { PostListItem } from './PostListItem';
import { HorizontalLoader } from '../ui/loaders/HorizontalLoader';
import { TPost } from '../../types/posts';

interface PostListProps {
  posts: TPost[];
  isPostsLoading: boolean;
  isShowContent?: boolean;
}

export const PostList = ({
  posts,
  isPostsLoading,
  isShowContent = true
}: PostListProps) => {
  return (
    <div className="w-100">
      {isPostsLoading && <HorizontalLoader />}
      {posts.length === 0 && !isPostsLoading && (
        <p className="font-m">No posts yet</p>
      )}
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} isShowContent={isShowContent} />
      ))}
    </div>
  );
};
