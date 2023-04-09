import React from 'react';
import { PostSidebarBlock } from './PostSidebarBlock';
import { PostList } from '../PostList';
import styles from '../../../assets/styles/posts.module.scss';
import { TPost } from '../../../types/posts';

export interface IPostSidebarProps {
  postsWithLikes: TPost[];
  isPostsWithLikesLoading: boolean;
  postsWithViews: TPost[];
  isPostsWithViewsLoading: boolean;
}

export const PostSidebar = ({
  postsWithLikes,
  isPostsWithLikesLoading,
  postsWithViews,
  isPostsWithViewsLoading
}: IPostSidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <PostSidebarBlock title="Top liked posts">
        <PostList
          posts={postsWithLikes}
          isPostsLoading={isPostsWithLikesLoading}
          isShowContent={false}
        />
      </PostSidebarBlock>
      <PostSidebarBlock title="Top viewed posts">
        <PostList
          posts={postsWithViews}
          isPostsLoading={isPostsWithViewsLoading}
          isShowContent={false}
        />
      </PostSidebarBlock>
    </div>
  );
};
