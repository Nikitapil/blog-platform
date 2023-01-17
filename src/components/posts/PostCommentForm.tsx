import React, { useMemo, useState } from 'react';
import { AppTexArea } from '../ui/AppTextArea';
import { AppButton } from '../ui/AppButton';
import styles from '../../assets/styles/posts.module.scss';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { usePostsActions } from '../../hooks/store/usePostsActions';

export const PostCommentForm = () => {
  const [comment, setComment] = useState('');
  const { singlePost } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const { addPostComment } = usePostsActions();

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singlePost || !user) {
      return;
    }
    await addPostComment(user.id, singlePost.id, comment);
    setComment('');
  };

  const isFieldDisabled = useMemo(() => {
    return !user || !singlePost;
  }, [user, singlePost]);

  const isButtonDisabled = useMemo(() => {
    return !comment.trim() || isFieldDisabled;
  }, [comment, isFieldDisabled]);

  const placeHolder = useMemo(() => {
    return user ? 'Write your comment...' : 'Login first to add new comments';
  }, [user]);

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
        text="Send"
        size="lg"
        disabled={isButtonDisabled}
      />
    </form>
  );
};
