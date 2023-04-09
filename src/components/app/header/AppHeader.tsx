import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../../assets/styles/header.module.scss';
import { Modal } from '../../ui/Modal';
import { AuthForm } from '../../auth/AuthForm';
import { AuthFormData } from '../../../types/auth-form';
import { useAuthActions } from '../../../hooks/store/useAuthActions';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { AuthButtons } from './AuthButtons';

export const AppHeader = () => {
  const [isSignInModalOpened, setIsSignInModalOpened] = useState(false);
  const [isSignUpModalOpened, setIsSignUpModalOpened] = useState(false);
  const { registration, setSignError, logout, login } = useAuthActions();
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSignInModalChange = useCallback(() => {
    setIsSignInModalOpened(!isSignInModalOpened);
    setSignError('');
  }, [isSignInModalOpened, setSignError]);

  const onSignUpModalChange = () => {
    setIsSignUpModalOpened(!isSignUpModalOpened);
    setSignError('');
  };

  const onSignIn = async (values: AuthFormData) => {
    await login(values);
  };

  const logOut = async () => {
    await logout();
  };

  const onSignUp = async (values: AuthFormData) => {
    await registration(values);
  };

  const goToProfile = () => navigate(`/profile/${user?.id}/personal`);

  useEffect(() => {
    if (user && isSignUpModalOpened) {
      setIsSignUpModalOpened(false);
      return;
    }
    if (user && isSignInModalOpened) {
      setIsSignInModalOpened(false);
    }
  }, [isSignInModalOpened, isSignUpModalOpened, user]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <Link to="/" className={styles.header__link}>
          <h1>Blog Platform</h1>
        </Link>
        <AuthButtons
          user={user}
          isAuthLoading={isAuthLoading}
          onSignIn={onSignInModalChange}
          onSignUp={onSignUpModalChange}
          openProfile={goToProfile}
          logOut={logOut}
        />
      </div>
      <Modal isOpened={isSignInModalOpened} closeModal={onSignInModalChange}>
        <AuthForm
          isSignUp={false}
          closeModal={onSignInModalChange}
          onSubmit={onSignIn}
        />
      </Modal>
      <Modal isOpened={isSignUpModalOpened} closeModal={onSignUpModalChange}>
        <AuthForm
          isSignUp
          closeModal={onSignUpModalChange}
          onSubmit={onSignUp}
        />
      </Modal>
    </header>
  );
};
