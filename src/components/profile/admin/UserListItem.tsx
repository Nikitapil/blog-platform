import React, { useState } from 'react';
import { TAdminUserDto } from '../../../types/admin';
import styles from '../../../assets/styles/profile.module.scss';
import { UserLink } from '../UserLink';
import { AppButton } from '../../ui/AppButton';
import { BanUserModal } from './BanUserModal';
import { useProfileActions } from '../../../hooks/store/useProfileActions';

interface UserListItemProps {
  user: TAdminUserDto;
}

export const UserListItem = ({ user }: UserListItemProps) => {
  const [isBanUserModalOpened, setIsBanUserModalOpened] = useState(false);
  const { unbanUser } = useProfileActions();
  const onOpenBanUserModal = () => setIsBanUserModalOpened(true);
  const onCloseBanUserModal = () => setIsBanUserModalOpened(false);

  const unbanUserHandler = async () => {
    await unbanUser(user.id);
  };

  return (
    <>
      <div className={styles['user-container']}>
        <div className={styles.user}>
          <UserLink
            username={user.userName}
            userId={user.id}
            avatar={user.avatar}
          />
          <div>
            {!user.banned && (
              <AppButton
                text="Ban user"
                color="danger"
                onClick={onOpenBanUserModal}
              />
            )}
            {user.banned && (
              <AppButton
                text="Unban user"
                color="danger"
                onClick={unbanUserHandler}
              />
            )}
          </div>
        </div>
        {user.banned && (
          <p className="color-red">Ban reason: {user.banReason}</p>
        )}
      </div>
      <BanUserModal
        isOpened={isBanUserModalOpened}
        closeModal={onCloseBanUserModal}
        userName={user.userName}
        userId={user.id}
      />
    </>
  );
};
