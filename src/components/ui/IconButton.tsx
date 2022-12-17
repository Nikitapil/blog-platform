import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../../assets/styles/icon-button.module.scss';

interface IconButtonProps {
  icon: IconProp;
  type: 'button' | 'submit';
  onClick: () => void;
}

export const IconButton = ({ icon, type, onClick }: IconButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
