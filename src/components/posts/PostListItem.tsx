import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { TPost } from '../../types/posts';
import styles from '../../assets/styles/posts.module.scss';
import { formatDate } from '../../helpers/dates';
import { usePostImage } from '../../hooks/posts/usePostImage';

interface PostListItemProps {
  post: TPost;
  isShowContent?: boolean;
}

export const PostListItem = ({
  post,
  isShowContent = true
}: PostListItemProps) => {
  const navigate = useNavigate();
  const image = usePostImage(post);

  const date = useMemo(() => {
    return formatDate(post.createdAt);
  }, [post]);

  const clickHandler = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <div
      className={styles.post}
      style={{ height: isShowContent ? 150 : 'initial' }}
      onClick={clickHandler}
    >
      {image && isShowContent && (
        <div className={styles.post__image}>
          <img src={image} alt={post.title} />
        </div>
      )}
      <div className={styles.post__info}>
        <h1>{post.title}</h1>
        {isShowContent && (
          <p className={styles.post__content}>{post.content}</p>
        )}
        <div className={styles.post__meta}>
          <div className={styles['post__meta-info']}>
            <p>{date}</p>
            <div className={styles.post__likes}>
              <span title="Likes">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span>{post.likesCount}</span>
              <span title="Comments">
                <FontAwesomeIcon icon={faComment} />
              </span>
              <span>{post.commentsCount}</span>
              <span title="Views">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span>{post.viewsCount}</span>
            </div>
          </div>
          <p>{post.author}</p>
        </div>
      </div>
    </div>
  );
};
