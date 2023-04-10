import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../assets/styles/posts.module.scss';
import { TPost } from '../../../types/posts';
import { UserLink } from '../../profile/UserLink';
import { PostHashTag } from '../PostHashTag';
import { usePostImage } from '../../../hooks/posts/usePostImage';
import { formatDate } from '../../../helpers/dates';

interface IPostListItemProps {
  post: TPost;
}

export const PostPlateItem = ({ post }: IPostListItemProps) => {
  const image = usePostImage(post);

  const date = useMemo(() => {
    return formatDate(post.createdAt);
  }, [post]);

  return (
    <div className={styles['post-plate']}>
      {image && (
        <div className={styles['post-plate__image']}>
          <img src={image} alt={post.title} />
        </div>
      )}
      <Link className={styles.post__title} to={`/posts/${post.id}`}>
        <h1>{post.title}</h1>
      </Link>
      <p className={styles.post__content}>{post.content}</p>
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
        <UserLink
          username={post.author}
          userId={post.userId}
          avatar={post.userAvatar}
        />
      </div>
      <div className={styles.post__tags}>
        {post.hashtags.map((tag) => (
          <PostHashTag tag={tag} key={tag} />
        ))}
      </div>
    </div>
  );
};
