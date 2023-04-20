import React from 'react';
import styles from '../../../assets/styles/round-loader.module.scss';

interface IRoundLoaderProps {
  size?: number;
}

export const RoundLoader = ({ size = 80 }: IRoundLoaderProps) => {
  return (
    <div className={styles['lds-ring']} style={{ height: size, width: size }}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
