import React, { useMemo, useState } from 'react';
import { TPostComment } from '../../../types/posts';
import { formatDate } from '../../../helpers/dates';
import styles from '../../../assets/styles/posts.module.scss';
import { PostCommentForm } from './PostCommentForm';
import { UserLink } from '../../profile/UserLink';
import { ConfirmModal } from '../../common/ConfirmModal';
import { TUser } from '../../../types/auth-form';
import { usePostEditButtonRules } from '../../../hooks/posts/usePostEditButtonRules';
import { EditDeletePostButtons } from '../EditDeletePostButtons';
import { usePostsActions } from '../../../hooks/store/usePostsActions';

interface PostCommentProps {
  comment: TPostComment;
  user: TUser | null;
}

export const PostComment = ({ comment, user }: PostCommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const buttonRules = usePostEditButtonRules({ user, editableItem: comment });
  const { editPostComment, deletePostComment } = usePostsActions();

  const date = useMemo(() => {
    return formatDate(comment.createdAt);
  }, [comment]);

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

  const onEdit = async (value: string) => {
    await editPostComment(comment.id, value);
    onCloseForm();
  };

  if (isEditing) {
    return (
      <div className="mt-10">
        <PostCommentForm
          existedComment={comment}
          user={user}
          submitFn={onEdit}
        />
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
        <EditDeletePostButtons
          canEdit={buttonRules.canEdit}
          canDelete={buttonRules.canDelete}
          onEdit={onOpenForm}
          onDelete={onDeleteModalChange}
        />
      </div>
      <p>{comment.text}</p>
      <ConfirmModal
        title="Are you sure, you want to delete this comment?"
        isOpened={isDeleteModalOpen}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="danger"
        onCancel={onDeleteModalChange}
        onConfirm={onDeleteComment}
      />
    </article>
  );
};
