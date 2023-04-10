import React from 'react';
import styles from '../../../assets/styles/posts.module.scss';
import { TPost } from '../../../types/posts';
import { PostPlateItem } from './PostPlateItem';
import { HorizontalLoader } from '../../ui/loaders/HorizontalLoader';

interface IPostListProps {
  posts: TPost[];
  isPostsLoading: boolean;
}

export const PostPlateList = ({ posts, isPostsLoading }: IPostListProps) => {
  if (isPostsLoading) {
    return <HorizontalLoader />;
  }

  if (!posts.length) {
    return <p className="font-m">No posts yet</p>;
  }

  return (
    <div className={styles['post-plate__list']}>
      {posts.map((post) => (
        <PostPlateItem post={post} key={post.id} />
      ))}
    </div>
  );
};
