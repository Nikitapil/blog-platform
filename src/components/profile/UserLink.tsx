import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';
import { UserAvatar } from './userAvatar';

interface UserLinkProps {
  username: string;
  userId: number;
  avatar?: string;
}

export const UserLink = ({ userId, username, avatar }: UserLinkProps) => {
  return (
    <Link to={`/profile/${userId}/user-posts`} className={styles['user-link']}>
      <UserAvatar src={avatar} />
      <p className={styles.username}>{username}</p>
    </Link>
  );
};
