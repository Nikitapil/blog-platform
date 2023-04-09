import React, { memo } from 'react';
import { HorizontalLoader } from '../../ui/loaders/HorizontalLoader';
import styles from '../../../assets/styles/header.module.scss';
import { AppButton } from '../../ui/AppButton';
import { TUser } from '../../../types/auth-form';

interface IAuthButtonsProps {
  onSignIn: () => void;
  onSignUp: () => void;
  openProfile: () => void;
  logOut: () => void;
  user: TUser | null;
  isAuthLoading: boolean;
}

export const AuthButtons = memo(
  ({
    onSignIn,
    onSignUp,
    openProfile,
    logOut,
    user,
    isAuthLoading
  }: IAuthButtonsProps) => {
    if (isAuthLoading) {
      return <HorizontalLoader />;
    }

    if (!user) {
      return (
        <div className={styles.header__btns}>
          <AppButton
            onClick={onSignIn}
            type="button"
            text="Sign in"
            color="transparent"
          />
          <AppButton
            onClick={onSignUp}
            type="button"
            text="Sign up"
            color="transparent"
          />
        </div>
      );
    }

    return (
      <div className={styles.header__btns}>
        <AppButton
          type="button"
          text={user.userName}
          color="transparent"
          onClick={openProfile}
        />
        <AppButton
          type="button"
          text="Logout"
          color="danger"
          onClick={logOut}
        />
      </div>
    );
  }
);
