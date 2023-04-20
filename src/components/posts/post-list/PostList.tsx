import React from 'react';
import { PostListItem } from './PostListItem';
import { HorizontalLoader } from '../../ui/loaders/HorizontalLoader';
import { TPost } from '../../../types/posts';

interface IPostListProps {
  posts: TPost[];
  isPostsLoading: boolean;
  isShowContent?: boolean;
}

export const PostList = ({
  posts,
  isPostsLoading,
  isShowContent = true
}: IPostListProps) => {
  if (isPostsLoading) {
    return (
      <div className="container">
        <HorizontalLoader />
      </div>
    );
  }

  if (!posts.length) {
    return <p className="font-m">No posts yet</p>;
  }

  return (
    <div className="w-100">
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} isShowContent={isShowContent} />
      ))}
    </div>
  );
};
