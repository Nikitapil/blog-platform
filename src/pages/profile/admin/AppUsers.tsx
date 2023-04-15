import React, { useEffect, useState } from 'react';
import styles from '../../../assets/styles/profile.module.scss';
import { useProfileActions } from '../../../hooks/store/useProfileActions';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { UserListItem } from '../../../components/profile/admin/UserListItem/UserListItem';
import { Pagination } from '../../../components/ui/Pagination';

export const AppUsers = () => {
  const [page, setPage] = useState(1);
  const { getUsers, getRoles } = useProfileActions();
  const { users, usersCount } = useAppSelector((state) => state.admin);

  useEffect(() => {
    getUsers(page);
    getRoles();
  }, [page]);

  return (
    <div className={styles['users-page']}>
      <h2 className={styles['users-page__title']}>App users</h2>
      <div className={styles['user-list']}>
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalCount={usersCount}
        setPage={setPage}
      />
    </div>
  );
};
