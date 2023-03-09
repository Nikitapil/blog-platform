import React, { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';
import { useAppSelector } from '../../hooks/store/useAppSelector';

export const ProfileNavbar = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.profile);
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const isShowPersonalLink = useMemo(() => {
    return user?.id === currentUser?.id;
  }, [user, currentUser]);

  const isShowAdminLink = useMemo(() => {
    return isShowPersonalLink && currentUser?.isAdmin;
  }, [user, isShowPersonalLink]);

  return (
    <nav className={styles['profile-navbar']}>
      {isShowPersonalLink && (
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={`/profile/${id}/personal`}
        >
          Personal
        </NavLink>
      )}
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to={`/profile/${id}/user-posts`}
      >
        Posts
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to={`/profile/${id}/user-likes`}
      >
        Likes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to={`/profile/${id}/user-comments`}
      >
        Comments
      </NavLink>
      {isShowAdminLink && (
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to={`/profile/${id}/admin/users`}
        >
          Admin
        </NavLink>
      )}
    </nav>
  );
};
