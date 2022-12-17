import React, { useState } from 'react';
import styles from '../../assets/styles/header.module.scss';
import { Modal } from '../ui/Modal';
import { AppButton } from '../ui/AppButton';
import { AuthForm } from '../auth/AuthForm';
import { AuthFormData } from '../../types/auth-form';
import { useAuthActions } from '../../hooks/store/useAuthActions';

export const AppHeader = () => {
  const [isSignInModalOpened, setIsSignInModalOpened] = useState(false);
  const [isSignUpModalOpened, setIsSignUpModalOpened] = useState(false);
  const { registration, setSignError } = useAuthActions();
  const onSignInModalChange = () =>
    setIsSignInModalOpened(!isSignInModalOpened);

  const onSignUpModalChange = () => {
    setIsSignUpModalOpened(!isSignUpModalOpened);
    setSignError(false);
  };

  const onSignIn = (values: AuthFormData) => {
    console.log(values);
  };

  const onSignUp = async (values: AuthFormData) => {
    await registration(values);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <h1>Blog Platform</h1>
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
