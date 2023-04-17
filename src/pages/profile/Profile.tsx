import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';
import { ProfileNavbar } from '../../components/profile/ProfileNavbar';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { UserAvatar } from '../../components/profile/userAvatar';
import { profileSelector } from '../../store/selectors';
import { HorizontalLoader } from '../../components/ui/loaders/HorizontalLoader';

export const Profile = () => {
  const { user, isUserLoading, isAvatarLoading } =
    useAppSelector(profileSelector);
  const { getUser } = useProfileActions();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [getUser, id]);

  if (isUserLoading) {
    return <HorizontalLoader />;
  }

  if (!user) {
    return <p className="mt-10">User not found</p>;
  }

  return (
    <main className="container">
      <div className={styles.profile}>
        <div className={styles.profile__header}>
          {!isAvatarLoading && <UserAvatar src={user.avatar} />}
          <h2 className={styles['profile__user-name']}>{user.userName}</h2>
        </div>
        <ProfileNavbar />
        <div className="mt-10 w-100">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
