import React from 'react';
import style from '../../assets/styles/app-button.module.scss';
import { TButtonColorType } from '../../types/common';

interface IconButtonProps {
  text: string;
  isLoading?: boolean;
  color?: TButtonColorType;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const AppButton = ({
  text,
  onClick,
  type = 'button',
  color = 'primary',
  disabled = false,
  size = 'sm',
  isLoading
}: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button} ${style[color]} ${style[size]} ${
        isLoading ? style.loading : ''
      }`}
      disabled={disabled || isLoading}
    >
      <span className={style.text}>{text}</span>
    </button>
  );
};
