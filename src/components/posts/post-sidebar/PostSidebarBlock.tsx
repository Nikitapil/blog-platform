import React from 'react';
import styles from '../../../assets/styles/posts.module.scss';

interface PostSidebarBlockProps {
  children: JSX.Element | string | React.ReactNode;
  title: string;
}

export const PostSidebarBlock = ({
  children,
  title
}: PostSidebarBlockProps) => {
  return (
    <div className={styles['sidebar-block']}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
