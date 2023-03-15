import React, { useEffect } from 'react';
import styles from '../../../assets/styles/profile.module.scss';
import { useProfileActions } from '../../../hooks/store/useProfileActions';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { UserListItem } from '../../../components/profile/admin/UserListItem';

export const AppUsers = () => {
  const { getUsers, getRoles } = useProfileActions();
  const { users } = useAppSelector((state) => state.admin);

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  return (
    <div className={styles['users-page']}>
      <h2 className={styles['users-page__title']}>App users</h2>
      <div className={styles['user-list']}>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
