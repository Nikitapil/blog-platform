import React from 'react';
import { PostSidebarBlock } from './PostSidebarBlock';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { PostList } from '../PostList';
import styles from '../../../assets/styles/posts.module.scss';

export const PostSidebar = () => {
  const {
    postsWithLikes,
    isPostsWithLikesLoading,
    postsWithViews,
    isPostsWithViewsLoading
  } = useAppSelector((state) => state.posts);
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
