import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../../assets/styles/icon-button.module.scss';

interface IconButtonProps {
  icon: IconProp;
  type: 'button' | 'submit';
  disabled?: boolean;
  onClick: () => void;
}

export const IconButton = ({
  icon,
  type,
  onClick,
  disabled = false
}: IconButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={styles.button}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
