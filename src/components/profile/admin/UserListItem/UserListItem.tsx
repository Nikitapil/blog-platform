import React, { useState } from 'react';
import { TAdminUserDto } from '../../../../types/admin';
import styles from '../../../../assets/styles/profile.module.scss';
import { UserLink } from '../../UserLink';
import { BanUserModal } from '../BanUserModal';
import { useProfileActions } from '../../../../hooks/store/useProfileActions';
import { RolesModal } from '../RolesModal';
import { UserListItemButtons } from './UserListItemButtons';

interface IUserListItemProps {
  user: TAdminUserDto;
}

export const UserListItem = ({ user }: IUserListItemProps) => {
  const [isBanUserModalOpened, setIsBanUserModalOpened] = useState(false);
  const [isRolesModalOpened, setIsRolesModalOpened] = useState(false);
  const { unbanUser } = useProfileActions();

  const onOpenBanUserModal = () => setIsBanUserModalOpened(true);
  const onCloseBanUserModal = () => setIsBanUserModalOpened(false);

  const onOpenRolesModal = () => setIsRolesModalOpened(true);
  const onCloseRolesModal = () => setIsRolesModalOpened(false);

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
          <div className="d-flex gap-10">
            <UserListItemButtons
              isUserBanned={user.banned}
              unbanUserHandler={unbanUserHandler}
              onOpenBanUserModal={onOpenBanUserModal}
              onOpenRolesModal={onOpenRolesModal}
            />
          </div>
        </div>
        {user.banned && (
          <p className="color-red">Ban reason: {user.banReason}</p>
        )}
        <p className="d-flex gap-10">
          Roles:
          {user.roles?.map((role) => (
            <span key={role.id}>{role.value}</span>
          ))}
        </p>
      </div>
      <BanUserModal
        isOpened={isBanUserModalOpened}
        closeModal={onCloseBanUserModal}
        userName={user.userName}
        userId={user.id}
      />
      <RolesModal
        isOpened={isRolesModalOpened}
        closeModal={onCloseRolesModal}
        userName={user.userName}
        userRoles={user.roles}
        userId={user.id}
      />
    </>
  );
};
