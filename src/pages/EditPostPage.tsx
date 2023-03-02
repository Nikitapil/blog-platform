import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRequest } from '../hooks/utils/useRequest';
import { TPost, TPostRequest } from '../types/posts';
import { PostsService } from '../services/PostsService';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { useAppSelector } from '../hooks/store/useAppSelector';
import styles from '../assets/styles/posts.module.scss';
import { PostForm } from '../components/posts/PostForm';

export const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSinglePost } = usePostsActions();
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const { singlePost, singlePostError } = useAppSelector(
    (state) => state.posts
  );
  const [editPost, isEditing, editError] = useRequest<TPostRequest, TPost>(
    async (values: TPostRequest) => {
      return PostsService.editPost(
        values.title,
        values.content,
        values.image,
        values.userId,
        values.id!,
        values.imageName!
      );
    }
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    getSinglePost(id);
  }, [id]);

  useEffect(() => {
    if (singlePost && singlePost.userId !== user?.id && !isAuthLoading) {
      navigate('/');
    }
  }, [singlePost, user, isAuthLoading]);

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
