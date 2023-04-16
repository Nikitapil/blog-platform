import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from '../../assets/styles/icon-button.module.scss';

interface IconButtonProps {
  icon: IconProp;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IconButton = ({
  icon,
  type,
  onClick,
  disabled = false,
  className
}: IconButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
