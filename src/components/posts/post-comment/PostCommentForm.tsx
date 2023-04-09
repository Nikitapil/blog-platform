import React, { useEffect, useMemo, useState } from 'react';
import { AppTexArea } from '../../ui/AppTextArea';
import { AppButton } from '../../ui/AppButton';
import styles from '../../../assets/styles/posts.module.scss';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { usePostsActions } from '../../../hooks/store/usePostsActions';
import { TPostComment } from '../../../types/posts';

interface IPostCommentFormProps {
  existedComment?: TPostComment;
  closeForm?: () => void;
}

export const PostCommentForm = ({
  existedComment,
  closeForm
}: IPostCommentFormProps) => {
  const [comment, setComment] = useState('');
  const { singlePost } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const { addPostComment, editPostComment } = usePostsActions();

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singlePost || !user) {
      return;
    }
    if (existedComment && closeForm) {
      await editPostComment(existedComment.id, comment);
      closeForm();
    } else {
      await addPostComment(user.id, singlePost.id, comment);
    }
    setComment('');
  };

  useEffect(() => {
    if (existedComment) {
      setComment(existedComment.text);
    }
  }, [existedComment]);

  const isFieldDisabled = useMemo(() => {
    return !user || !singlePost;
  }, [user, singlePost]);

  const isButtonDisabled = useMemo(() => {
    return !comment.trim() || isFieldDisabled;
  }, [comment, isFieldDisabled]);

  const placeHolder = useMemo(() => {
    return user ? 'Write your comment...' : 'Login first to add new comments';
  }, [user]);

  const buttonText = useMemo(() => {
    return existedComment ? 'Save' : 'Send';
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
