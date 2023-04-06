import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import styles from '../../assets/styles/tag.module.scss';

interface ITagProps {
  text: string;
  deleteAvailable?: boolean;
  deleteHandler?: (tag: string) => void;
}

export const Tag = ({
  text,
  deleteAvailable = false,
  deleteHandler = () => {}
}: ITagProps) => {
  const onDelete = useCallback(() => {
    deleteHandler(text);
  }, [deleteHandler, text]);

  return (
    <div className={styles.tag}>
      <p>{text}</p>
      {deleteAvailable && <FontAwesomeIcon icon={faXmark} onClick={} />}
    </div>
  );
};
