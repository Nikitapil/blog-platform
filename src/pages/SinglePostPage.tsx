import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  faComment,
  faEye,
  faHeart as faHeartSolid
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
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
import { HorizontalLoader } from '../components/ui/loaders/HorizontalLoader';
import { PostCommentForm } from '../components/posts/post-comment/PostCommentForm';
import { PostComment } from '../components/posts/post-comment/PostComment';
import { UserLink } from '../components/profile/UserLink';
import 'github-markdown-css/github-markdown-dark.css';
import { PostHashTag } from '../components/posts/PostHashTag';
import { usePostEditButtonRules } from '../hooks/posts/usePostEditButtonRules';
import { EditDeletePostButtons } from '../components/posts/EditDeletePostButtons';

export const SinglePostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { getSinglePost, addPostLike, deletePostLike, addPostComment } =
    usePostsActions();
  const {
    singlePost,
    singlePostError,
    isSinglePostLoading,
    singlePostLikes,
    singlePostComments
  } = useAppSelector((state) => state.posts);
  const image = usePostImage(singlePost);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [deletePost, isDeleting, deletingError] = useRequest<void, null>(
    async () => {
      const response = await PostsService.deletePost(id!);
      return response;
    }
  );

  const buttonRules = usePostEditButtonRules({
    user,
    editableItem: singlePost
  });

  const onDeleteModalChange = () => {
    setIsDeleteModalOpened(!isDeleteModalOpened);
  };

  const date = useMemo(() => {
    if (!singlePost) {
      return '';
    }
    return formatDate(singlePost.createdAt);
  }, [singlePost]);

  const isUserLiked = useMemo(() => {
    if (!user || !singlePost) {
      return false;
    }
    return !!singlePostLikes.find((like) => like.userId === user.id);
  }, [singlePost, singlePostLikes, user]);

  const likeIcon = useMemo(() => {
    return isUserLiked ? faHeartSolid : faHeart;
  }, [isUserLiked]);

  useEffect(() => {
    if (!id) {
      return;
    }
    getSinglePost(id);
  }, [id]);

  const onDeletePost = async () => {
    await deletePost();
    if (!deletingError) {
      onDeleteModalChange();
      navigate('/');
      toast.error('Post deleted');
    }
  };

  const navigateToEditPage = () => navigate(`/posts/${id}/edit`);

  const clickLike = async () => {
    if (!singlePost || !user) {
      return;
    }
    if (isUserLiked) {
      await deletePostLike(singlePost.id);
    } else {
      await addPostLike(singlePost.id, user.id);
    }
  };

  const onAddComment = async (value: string) => {
    if (!user || !singlePost) {
      return;
    }
    await addPostComment(user.id, singlePost.id, value);
  };

  if (isSinglePostLoading) {
    return (
      <div className="container fit-content">
        <HorizontalLoader />
      </div>
    );
  }

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
          <EditDeletePostButtons
            canEdit={buttonRules.canEdit}
            canDelete={buttonRules.canDelete}
            onEdit={navigateToEditPage}
            onDelete={onDeleteModalChange}
          />
        </div>
        <div className={styles['single-post__likes']}>
          <IconButton
            icon={likeIcon}
            type="button"
            disabled={!user}
            onClick={clickLike}
          />
          <span>{singlePostLikes.length}</span>
          <a href="#comments" className={styles['single-post__comments-link']}>
            <FontAwesomeIcon icon={faComment} />
          </a>
          <span>{singlePostComments.length}</span>
          <span
            className={styles['single-post__comments-link']}
            title="Views count"
          >
            <FontAwesomeIcon icon={faEye} />
          </span>
          <span>{singlePost.viewsCount}</span>
        </div>
        <div className={styles.post__meta}>
          <p>{date}</p>
          <UserLink
            username={singlePost.author}
            userId={singlePost.userId}
            avatar={singlePost.userAvatar}
          />
        </div>
        {image && (
          <div className={styles['single-post__image']}>
            <img src={image} alt={singlePost.title} />
          </div>
        )}
        <ReactMarkdown className="markdown-body mt-10 pa-10">
          {singlePost.content}
        </ReactMarkdown>
        <section className="w-100 mt-10 d-flex gap-10">
          {singlePost.hashtags.map((tag) => (
            <PostHashTag tag={tag} key={tag} />
          ))}
        </section>
        <h3 className={styles['single-post__comments-title']} id="comments">
          Comments
        </h3>
        <section className={styles['single-post__comment-form']}>
          <PostCommentForm user={user} submitFn={onAddComment} />
          {singlePostComments.map((comment) => {
            return (
              <PostComment comment={comment} key={comment.id} user={user} />
            );
          })}
        </section>
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
