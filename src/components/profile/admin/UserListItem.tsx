import React, { useState } from 'react';
import { TAdminUserDto } from '../../../types/admin';
import styles from '../../../assets/styles/profile.module.scss';
import { UserLink } from '../UserLink';
import { AppButton } from '../../ui/AppButton';
import { BanUserModal } from './BanUserModal';

interface UserListItemProps {
  user: TAdminUserDto;
}

export const UserListItem = ({ user }: UserListItemProps) => {
  const [isBanUserModalOpened, setIsBanUserModalOpened] = useState(false);

  const onOpenBanUserModal = () => setIsBanUserModalOpened(true);
  const onCloseBanUserModal = () => setIsBanUserModalOpened(false);

  return (
    <>
      <div className={styles.user}>
        <UserLink
          username={user.userName}
          userId={user.id}
          avatar={user.avatar}
        />
        <div>
          <AppButton
            text="Ban user"
            color="danger"
            onClick={onOpenBanUserModal}
          />
        </div>
      </div>
      <BanUserModal
        isOpened={isBanUserModalOpened}
        closeModal={onCloseBanUserModal}
        userName={user.userName}
      />
    </>
  );
};
