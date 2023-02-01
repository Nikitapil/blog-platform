import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';
import { ProfileNavbar } from '../../components/profile/ProfileNavbar';
import { useAppSelector } from '../../hooks/store/useAppSelector';

export const Profile = () => {
  const { profileName } = useAppSelector((state) => state.profile);
  return (
    <main className="container">
      <div className={styles.profile}>
        {profileName && (
          <h2 className={styles['profile__user-name']}>{profileName}</h2>
        )}
        <ProfileNavbar />
        <div className="mt-10 w-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
