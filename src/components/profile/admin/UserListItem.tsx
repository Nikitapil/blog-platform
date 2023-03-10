import React from 'react';
import { TAdminUserDto } from '../../../types/admin';
import styles from '../../../assets/styles/profile.module.scss';
import { UserLink } from '../UserLink';
import { AppButton } from '../../ui/AppButton';

interface UserListItemProps {
  user: TAdminUserDto;
}

export const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <div className={styles.user}>
      <UserLink
        username={user.userName}
        userId={user.id}
        avatar={user.avatar}
      />
      <div>
        <AppButton text="Ban user" color="danger" />
      </div>
    </div>
  );
};
