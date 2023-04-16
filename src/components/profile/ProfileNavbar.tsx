import React, { useCallback, useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { authSelector } from '../../store/selectors';

export const ProfileNavbar = () => {
  const { id } = useParams();
  const { user: currentUser } = useAppSelector(authSelector);

  const isShowPersonalLink = useMemo(() => {
    return id === currentUser?.id.toString();
  }, [id, currentUser]);

  const isShowAdminLink = useMemo(() => {
    return isShowPersonalLink && currentUser?.isAdmin;
  }, [isShowPersonalLink, currentUser?.isAdmin]);

  const classNameFn = useCallback(({ isActive }: { isActive: boolean }) => {
    return isActive ? styles.active : '';
  }, []);

  return (
    <nav className={styles['profile-navbar']}>
      {isShowPersonalLink && (
        <NavLink className={classNameFn} to={`/profile/${id}/personal`}>
          Personal
        </NavLink>
      )}
      <NavLink className={classNameFn} to={`/profile/${id}/user-posts`}>
        Posts
      </NavLink>
      <NavLink className={classNameFn} to={`/profile/${id}/user-likes`}>
        Likes
      </NavLink>
      <NavLink className={classNameFn} to={`/profile/${id}/user-comments`}>
        Comments
      </NavLink>
      {isShowAdminLink && (
        <NavLink className={classNameFn} to={`/profile/${id}/admin/users`}>
          Admin
        </NavLink>
      )}
    </nav>
  );
};
