import React, { FocusEvent, useMemo } from 'react';
import styles from '../../assets/styles/app-textarea.module.scss';

interface AppTextAreaProps {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLTextAreaElement, Element>) => void;
  error?: string;
  touched?: boolean;
  placeholder: string;
  name: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AppTexArea = ({
  id,
  label,
  value,
  onChange,
  error,
  touched,
  placeholder,
  name,
  onBlur,
  disabled = false,
  size = 'lg'
}: AppTextAreaProps) => {
  const inputClassName = useMemo(() => {
    return error && touched ? styles['input-error'] : '';
  }, [error, touched]);

  return (
    <div className={styles['input-container']}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        className={`${inputClassName} ${styles[size]}`}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
      />
      {error && touched && <p className={styles.error}>{error}</p>}
    </div>
  );
};
