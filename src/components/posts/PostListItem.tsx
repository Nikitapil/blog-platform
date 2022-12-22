import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TPost } from '../../types/posts';
import styles from '../../assets/styles/posts.module.scss';
import { formatDate } from '../../helpers/dates';
import { usePostImage } from '../../hooks/posts/usePostImage';

interface PostListItemProps {
  post: TPost;
}

export const PostListItem = ({ post }: PostListItemProps) => {
  const navigate = useNavigate();
  const image = usePostImage(post);

  const date = useMemo(() => {
    return formatDate(post.createdAt);
  }, [post]);

  const clickHandler = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className={styles.post} onClick={clickHandler}>
      {image && (
        <div className={styles.post__image}>
          <img src={image} alt={post.title} />
        </div>
      )}
      <div className={styles.post__info}>
        <h1>{post.title}</h1>
        <p className={styles.post__content}>{post.content}</p>
        <div className={styles.post__meta}>
          <p>{date}</p>
          <p>{post.author}</p>
        </div>
      </div>
    </div>
  );
};
