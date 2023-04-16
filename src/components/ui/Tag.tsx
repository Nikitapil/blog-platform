import React, { useCallback } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import styles from '../../assets/styles/tag.module.scss';
import { IconButton } from './IconButton';

interface ITagProps {
  text: string;
  deleteAvailable?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  deleteHandler?: (tag: string) => void;
}

export const Tag = ({
  text,
  onClick,
  deleteAvailable = false,
  deleteHandler = () => {},
  size = 'md'
}: ITagProps) => {
  const onDelete = useCallback(() => {
    deleteHandler(text);
  }, [deleteHandler, text]);

  return (
    <div className={`${styles.tag} ${styles[size]}`}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <p className={onClick ? styles.clickable : ''} onClick={onClick}>
        {text}
      </p>
      {deleteAvailable && (
        <IconButton icon={faXmark} onClick={onDelete} type="button" />
      )}
    </div>
  );
};
