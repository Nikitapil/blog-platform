import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TPostComment } from '../../types/posts';
import { formatDate } from '../../helpers/dates';
import styles from '../../assets/styles/profile.module.scss';

interface UserCommentProps {
  comment: TPostComment;
}

export const UserComment = ({ comment }: UserCommentProps) => {
  const date = useMemo(() => {
    return formatDate(comment.createdAt);
  }, [comment]);

  return (
    <Link to={`/posts/${comment.postId}`} className={styles.comment}>
      <div className={styles.comment__header}>
        <div className={styles.comment__date}>
          <p>{date}</p>
        </div>
      </div>
      <p>{comment.text}</p>
    </Link>
  );
};
