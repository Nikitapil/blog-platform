import React, { FocusEvent, useMemo } from 'react';
import styles from '../../assets/styles/app-input.module.scss';

interface AppInputProps {
  id: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void;
  error?: string;
  touched?: boolean;
  placeholder: string;
  name: string;
}

export const AppInput = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  error,
  touched,
  placeholder,
  name,
  onBlur
}: AppInputProps) => {
  const inputClassName = useMemo(() => {
    return error && touched ? styles['input-error'] : '';
  }, [error, touched]);

  return (
    <div className={styles['input-container']}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={inputClassName}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
      />
      {error && touched && <p className={styles.error}>{error}</p>}
    </div>
  );
};
