import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../../components/profile/admin/AdminSidebar';
import styles from '../../../assets/styles/profile.module.scss';

export const Admin = () => {
  return (
    <div className={styles['admin-page']}>
      <div className={styles['admin-page__nav']}>
        <AdminSidebar />
      </div>
      <div className={styles['admin-page__child']}>
        <Outlet />
      </div>
    </div>
  );
};
