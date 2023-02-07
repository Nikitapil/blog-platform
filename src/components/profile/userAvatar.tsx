import React, { useMemo } from 'react';
import avatarLogo from '../../assets/img/avatarTemplate.jpg';
import styles from '../../assets/styles/profile.module.scss';

interface UserAvatarProps {
  src?: string;
}

export const UserAvatar = ({ src }: UserAvatarProps) => {
  const avatarSrc = useMemo(() => {
    return src ? `${process.env.REACT_APP_API_URL}/${src}` : avatarLogo;
  }, [src]);

  return <img className={styles.avatar} src={avatarSrc} alt="avatar" />;
};
