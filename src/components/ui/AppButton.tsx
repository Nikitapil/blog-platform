import React from 'react';
import style from '../../assets/styles/app-button.module.scss';

interface IconButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  text: string;
  color?: 'primary' | 'success' | 'danger' | 'transparent';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AppButton = ({
  text,
  onClick,
  type = 'button',
  color = 'primary',
  disabled = false,
  size = 'sm'
}: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button} ${style[color]} ${style[size]}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
