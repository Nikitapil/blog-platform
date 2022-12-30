import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/error-page.module.scss';

export const ErrorPage = () => {
  return (
    <main className="container">
      <div className={styles['error-page']}>
        <h2>404</h2>
        <p className={styles['error-page__text']}>Page not found</p>
        <Link className={styles['error-page__link']} to="/">
          Go to main
        </Link>
      </div>
    </main>
  );
};
