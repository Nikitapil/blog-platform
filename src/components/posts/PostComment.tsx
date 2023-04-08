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
import { ConfirmModal } from '../common/ConfirmModal';

interface PostCommentProps {
  comment: TPostComment;
}

export const PostComment = ({ comment }: PostCommentProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { deletePostComment } = usePostsActions();
  const date = useMemo(() => {
    return formatDate(comment.createdAt);
  }, [comment]);

  const buttonRules = useMemo(() => {
    if (!user) {
      return { canEdit: false, canDelete: false };
    }
    const isUserEqual = user?.id === comment?.userId;
    return {
      canEdit: isUserEqual,
      canDelete: isUserEqual || user.isAdmin
    };
  }, [user, comment]);

  const onCloseForm = () => {
    setIsEditing(false);
  };

  const onOpenForm = () => {
    setIsEditing(true);
  };

  const onDeleteComment = async () => {
    await deletePostComment(comment.id);
  };

  const onDeleteModalChange = () => setIsDeleteModalOpen((prev) => !prev);

  if (isEditing) {
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
        <div className="d-flex gap-5 align-center">
          {buttonRules.canEdit && (
            <IconButton icon={faEdit} type="button" onClick={onOpenForm} />
          )}
          {buttonRules.canDelete && (
            <IconButton
              icon={faTrash}
              type="button"
              onClick={onDeleteModalChange}
            />
          )}
        </div>
      </div>
      <p>{comment.text}</p>
      <ConfirmModal
        title="Are you sure, you want to delete this comment?"
        isOpened={isDeleteModalOpen}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={onDeleteModalChange}
        onConfirm={onDeleteComment}
      />
    </article>
  );
};
