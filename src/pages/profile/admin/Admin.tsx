import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from '../../../components/profile/admin/AdminSidebar';
import styles from '../../../assets/styles/profile.module.scss';
import { useAppSelector } from '../../../hooks/store/useAppSelector';

export const Admin = () => {
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);

  if ((!user || !user.isAdmin) && !isAuthLoading) {
    return <Navigate to="/" />;
  }

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
