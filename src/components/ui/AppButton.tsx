import React from 'react';
import style from '../../assets/styles/app-button.module.scss';

interface IconButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  text: string;
  color?: 'primary' | 'success' | 'danger' | 'transparent';
  disabled?: boolean;
}

export const AppButton = ({
  text,
  type = 'button',
  onClick,
  color = 'primary',
  disabled = false
}: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button} ${style[color]}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
