import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { PostList } from '../components/posts/PostList';
import styles from '../assets/styles/main-page.module.scss';
import { AppButton } from '../components/ui/AppButton';
import { useAppSelector } from '../hooks/store/useAppSelector';

export const MainPage = () => {
  const { getPosts } = usePostsActions();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const navigateToCreation = () => {
    navigate('/posts/create-post');
  };

  return (
    <main className="container">
      <div className={styles['main-page']}>
        {user && (
          <div className={styles['main-page__create']}>
            <AppButton text="Create new post" onClick={navigateToCreation} />
          </div>
        )}
        <PostList />
      </div>
    </main>
  );
};
