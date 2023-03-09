import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from '../../../assets/styles/profile.module.scss';

export const AdminSidebar = () => {
  const { id } = useParams();
  return (
    <nav className={styles['admin-sidebar']}>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${styles.active} ${styles['admin-sidebar__link']}`
            : styles['admin-sidebar__link']
        }
        to={`/profile/${id}/admin/users`}
      >
        Users
      </NavLink>
    </nav>
  );
};
