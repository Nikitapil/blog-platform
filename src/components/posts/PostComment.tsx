import React, { useMemo, useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TPostComment } from '../../types/posts';
import { formatDate } from '../../helpers/dates';
import { IconButton } from '../ui/IconButton';
import styles from '../../assets/styles/posts.module.scss';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostCommentForm } from './PostCommentForm';
import { usePostsActions } from '../../hooks/store/usePostsActions';
import { UserLink } from '../profile/UserLink';
import { AppButton } from '../ui/AppButton';
import { Modal } from '../ui/Modal';

interface PostCommentProps {
  comment: TPostComment;
}

export const PostComment = ({ comment }: PostCommentProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEdditing, setIsEdditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deletePostComment } = usePostsActions();
  const date = useMemo(() => {
    return formatDate(comment.createdAt);
  }, [comment]);

  const isShowTools = useMemo(() => {
    return comment.userId === user?.id;
  }, [user, comment]);

  const onCloseForm = () => {
    setIsEdditing(false);
  };

  const onOpenForm = () => {
    setIsEdditing(true);
  };

  const onDeleteComment = async () => {
    await deletePostComment(comment.id);
  };

  const onDeleteModalChange = () => setIsDeleteModalOpen((prev) => !prev);

  if (isEdditing) {
    return (
      <div className="mt-10">
        <PostCommentForm existedComment={comment} closeForm={onCloseForm} />
      </div>
    );
  }

  return (
    <article className={styles.comment}>
      <div className={styles.comment__header}>
        <div className={styles.comment__info}>
          <UserLink
            username={comment.author}
            userId={comment.userId}
            avatar={comment.userAvatar}
          />
          <p>{date}</p>
        </div>
        {isShowTools && (
          <div>
            <IconButton icon={faEdit} type="button" onClick={onOpenForm} />
            <IconButton
              icon={faTrash}
              type="button"
              onClick={onDeleteModalChange}
            />
          </div>
        )}
      </div>
      <p>{comment.text}</p>
      <Modal isOpened={isDeleteModalOpen} closeModal={onDeleteModalChange}>
        <div className={styles['single-post__delete']}>
          <h3>Are you sure, you want to delete this comment?</h3>
          <div className={styles['single-post__delete-btns']}>
            <AppButton text="Cancel" onClick={onDeleteModalChange} />
            <AppButton text="Delete" color="danger" onClick={onDeleteComment} />
          </div>
        </div>
      </Modal>
    </article>
  );
};
