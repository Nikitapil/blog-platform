import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../../assets/styles/profile.module.scss';

export const ProfileNavbar = () => {
  const { id } = useParams();
  return (
    <nav className={styles['profile-navbar']}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        to={`/profile/${id}/personal`}
      >
        Personal
      </NavLink>
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
    </nav>
  );
};
