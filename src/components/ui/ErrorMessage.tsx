import React from 'react';
import styles from '../../assets/styles/messages.module.scss';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className={styles['error-message']}>{message}</div>;
};
