import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { useAppSelector } from '../hooks/store/useAppSelector';
import styles from '../assets/styles/posts.module.scss';
import { usePostImage } from '../hooks/posts/usePostImage';
import { formatDate } from '../helpers/dates';

export const SinglePostPage = () => {
  const { id } = useParams();
  const { getSinglePost } = usePostsActions();
  const { singlePost, singlePostError } = useAppSelector(
    (state) => state.posts
  );
  const image = usePostImage(singlePost);

  const date = useMemo(() => {
    if (!singlePost) {
      return '';
    }
    return formatDate(singlePost.createdAt);
  }, [singlePost]);

  useEffect(() => {
    if (!id) {
      return;
    }
    getSinglePost(id);
  }, [id]);

  if (!singlePost || singlePostError) {
    return (
      <div className="container">
        <div className={styles['single-post']}>
          <h3 className={styles['single-post__error']}>{singlePostError}</h3>
          <Link to="/" className={styles['single-post__link']}>
            Go to main
          </Link>
        </div>
      </div>
    );
  }
  return (
    <main className="container">
      <div className={styles['single-post']}>
        <h2 className={styles['single-post__title']}>{singlePost.title}</h2>
        <div className={styles.post__meta}>
          <p>{date}</p>
          <p>{singlePost.author}</p>
        </div>
        {image && (
          <div className={styles['single-post__image']}>
            <img src={image} alt={singlePost.title} />
          </div>
        )}
        <p className={styles['single-post__content']}>{singlePost.content}</p>
      </div>
    </main>
  );
};
