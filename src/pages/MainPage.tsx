import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { PostList } from '../components/posts/PostList';
import styles from '../assets/styles/main-page.module.scss';
import { AppButton } from '../components/ui/AppButton';

export const MainPage = () => {
  const { getPosts } = usePostsActions();
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const navigateToCreation = () => navigate('/posts/create-post');

  return (
    <main className="container">
      <div className={styles['main-page']}>
        <div className={styles['main-page__create']}>
          <AppButton text="Create new post" onClick={navigateToCreation} />
        </div>
        <PostList />
      </div>
    </main>
  );
};
