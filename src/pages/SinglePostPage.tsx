import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { usePostsActions } from '../hooks/store/usePostsActions';
import { useAppSelector } from '../hooks/store/useAppSelector';
import styles from '../assets/styles/posts.module.scss';
import { usePostImage } from '../hooks/posts/usePostImage';
import { formatDate } from '../helpers/dates';
import { IconButton } from '../components/ui/IconButton';
import { Modal } from '../components/ui/Modal';
import { AppButton } from '../components/ui/AppButton';
import { useRequest } from '../hooks/utils/useRequest';
import { PostsService } from '../services/PostsService';

export const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { getSinglePost } = usePostsActions();
  const { singlePost, singlePostError } = useAppSelector(
    (state) => state.posts
  );
  const image = usePostImage(singlePost);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [deletePost, isDeleting, deletingError] = useRequest<void, null>(
    async () => {
      const response = await PostsService.deletePost(id!);
      return response;
    }
  );
  const onDeleteModalChange = () => {
    setIsDeleteModalOpened(!isDeleteModalOpened);
  };

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

  const isShowButtons = useMemo(() => {
    if (!user || !singlePost) {
      return false;
    }
    return user?.id === singlePost?.userId;
  }, [user, singlePost]);

  const onDeletePost = async () => {
    await deletePost();
    if (!deletingError) {
      onDeleteModalChange();
      navigate('/');
    }
  };

  const navigateToEditPage = () => navigate(`/posts/${id}/edit`);

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
        <div className={styles['single-post__header']}>
          <h2 className={styles['single-post__title']}>{singlePost.title}</h2>
          {isShowButtons && (
            <div>
              <IconButton
                icon={faEdit}
                type="button"
                onClick={navigateToEditPage}
              />
              <IconButton
                icon={faTrash}
                type="button"
                onClick={onDeleteModalChange}
              />
            </div>
          )}
        </div>
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
      <Modal isOpened={isDeleteModalOpened} closeModal={onDeleteModalChange}>
        <div className={styles['single-post__delete']}>
          <h3>Are you sure, you want to delete this post?</h3>
          {deletingError && <p>{deletingError}</p>}
          <div className={styles['single-post__delete-btns']}>
            <AppButton
              text="Cancel"
              onClick={onDeleteModalChange}
              disabled={isDeleting}
            />
            <AppButton
              text="Delete"
              color="danger"
              onClick={onDeletePost}
              disabled={isDeleting}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
};
