import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { PostList } from '../components/posts/PostList';
import styles from '../assets/styles/main-page.module.scss';
import { AppButton } from '../components/ui/AppButton';
import { useAppSelector } from '../hooks/store/useAppSelector';
import { Pagination } from '../components/ui/Pagination';
import { SearchPostForm } from '../components/posts/SearchPostForm';

export const MainPage = () => {
  const { getPosts } = usePostsActions();
  const { user } = useAppSelector((state) => state.auth);
  const { totalPostsCount } = useAppSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getPosts(page, searchQuery);
  }, [page, searchQuery]);

  const navigateToCreation = () => {
    navigate('/posts/create-post');
  };

  const onSearch = (search: string) => {
    setPage(1);
    setSearchQuery(search);
  };

  return (
    <main className="container">
      <div className={styles['main-page']}>
        <div className={styles['main-page__controls']}>
          <SearchPostForm onSearch={onSearch} />
          {user && (
            <AppButton text="Create new post" onClick={navigateToCreation} />
          )}
        </div>
        <PostList />
        <Pagination
          currentPage={page}
          totalCount={totalPostsCount}
          setPage={setPage}
        />
      </div>
    </main>
  );
};
