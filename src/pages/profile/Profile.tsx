import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';
import { ProfileNavbar } from '../../components/profile/ProfileNavbar';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { UserAvatar } from '../../components/profile/userAvatar';

export const Profile = () => {
  const { user, isUserLoading, isAvatarLoading } = useAppSelector(
    (state) => state.profile
  );
  const { getUser } = useProfileActions();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <main className="container">
      {user && (
        <div className={styles.profile}>
          {user?.userName && (
            <div className={styles.profile__header}>
              {!isAvatarLoading && <UserAvatar src={user.avatar} />}
              <h2 className={styles['profile__user-name']}>{user.userName}</h2>
            </div>
          )}
          <ProfileNavbar />
          <div className="mt-10 w-100">
            <Outlet />
          </div>
        </div>
      )}
      {!user && !isUserLoading && <p className="mt-10">User not found</p>}
    </main>
  );
};
