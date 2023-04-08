import React from 'react';
import styles from '../../assets/styles/app-checkbox.module.scss';

interface AppCheckBoxProps {
  label: string;
  id: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export const AppCheckBox = ({
  label,
  setValue,
  value,
  id
}: AppCheckBoxProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
  };

  return (
    <label htmlFor={id} className={styles['app-checkbox']}>
      <input type="checkbox" id={id} checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
