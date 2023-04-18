import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useRequest } from '../hooks/utils/useRequest';
import { TPost, TPostRequest } from '../types/posts';
import { PostsService } from '../services/PostsService';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { useAppSelector } from '../hooks/store/useAppSelector';
import styles from '../assets/styles/posts.module.scss';
import { PostForm } from '../components/posts/PostForm';
import { authSelector, postsSelector } from '../store/selectors';

export const EditPostPage = () => {
  const { id } = useParams();
  const { getSinglePost } = usePostsActions();
  const { user, isAuthLoading } = useAppSelector(authSelector);
  const { singlePost, singlePostError } = useAppSelector(postsSelector);
  const [editPost, isEditing, editError] = useRequest<TPostRequest, TPost>(
    async (values: TPostRequest) => {
      return PostsService.editPost(values);
    }
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    getSinglePost(id);
  }, [getSinglePost, id]);

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

  if (singlePost.userId !== user?.id && !isAuthLoading) {
    return <Navigate to={`/posts/${singlePost.id}`} />;
  }

  return (
    <main className="container">
      <PostForm
        submitFn={editPost}
        isSubmitting={isEditing}
        submitError={editError}
        post={singlePost}
        submitButtonText="Edit"
        submitToast="Post saved!"
      />
    </main>
  );
};
