import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
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
          <div className={styles['post__meta-info']}>
            <p>{date}</p>
            <div className={styles.post__likes}>
              <FontAwesomeIcon icon={faHeart} />
              <span>{post.likesCount}</span>
            </div>
          </div>
          <p>{post.author}</p>
        </div>
      </div>
    </div>
  );
};
