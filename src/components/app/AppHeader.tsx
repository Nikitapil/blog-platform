import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/header.module.scss';
import { Modal } from '../ui/Modal';
import { AppButton } from '../ui/AppButton';
import { AuthForm } from '../auth/AuthForm';
import { AuthFormData } from '../../types/auth-form';
import { useAuthActions } from '../../hooks/store/useAuthActions';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { HorizontalLoader } from '../ui/loaders/HorizontalLoader';

export const AppHeader = () => {
  const [isSignInModalOpened, setIsSignInModalOpened] = useState(false);
  const [isSignUpModalOpened, setIsSignUpModalOpened] = useState(false);
  const { registration, setSignError, logout, login } = useAuthActions();
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSignInModalChange = () => {
    setIsSignInModalOpened(!isSignInModalOpened);
    setSignError('');
  };

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
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <Link to="/" className={styles.header__link}>
          <h1>Blog Platform</h1>
        </Link>
        {!user && !isAuthLoading && (
          <div className={styles.header__btns}>
            <AppButton
              onClick={onSignInModalChange}
              type="button"
              text="Sign in"
              color="transparent"
            />
            <AppButton
              onClick={onSignUpModalChange}
              type="button"
              text="Sign up"
              color="transparent"
            />
          </div>
        )}
        {isAuthLoading && <HorizontalLoader />}
        {user && !isAuthLoading && (
          <div className={styles.header__btns}>
            <AppButton
              type="button"
              text={user.userName}
              color="transparent"
              onClick={goToProfile}
            />
            <AppButton
              type="button"
              text="Logout"
              color="danger"
              onClick={logOut}
            />
          </div>
        )}
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
