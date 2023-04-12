import React, { useEffect, useMemo, useState } from 'react';
import { AppTexArea } from '../../ui/AppTextArea';
import { AppButton } from '../../ui/AppButton';
import styles from '../../../assets/styles/posts.module.scss';
import { TPostComment } from '../../../types/posts';
import { TUser } from '../../../types/auth-form';

interface IPostCommentFormProps {
  existedComment?: TPostComment;
  user: TUser | null;
  submitFn: (comment: string) => void;
}

export const PostCommentForm = ({
  existedComment,
  user,
  submitFn
}: IPostCommentFormProps) => {
  const [comment, setComment] = useState('');

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    submitFn(comment);
    setComment('');
  };

  const isFieldDisabled = useMemo(() => {
    return !user;
  }, [user]);

  const isButtonDisabled = useMemo(() => {
    return !comment.trim() || isFieldDisabled;
  }, [comment, isFieldDisabled]);

  const placeHolder = useMemo(() => {
    return user ? 'Write your comment...' : 'Login first to add new comments';
  }, [user]);

  const buttonText = useMemo(() => {
    return existedComment ? 'Save' : 'Send';
  }, [existedComment]);

  useEffect(() => {
    if (existedComment) {
      setComment(existedComment.text);
    }
  }, [existedComment]);

  return (
    <form className={styles['comment-form']} onSubmit={submitHandler}>
      <div className={styles['comment-form__field']}>
        <AppTexArea
          id="comment-area"
          value={comment}
          onChange={inputHandler}
          onBlur={() => {}}
          placeholder={placeHolder}
          name="comment"
          size="sm"
          disabled={isFieldDisabled}
        />
      </div>
      <AppButton
        type="submit"
        text={buttonText}
        size="lg"
        disabled={isButtonDisabled}
      />
    </form>
  );
};
