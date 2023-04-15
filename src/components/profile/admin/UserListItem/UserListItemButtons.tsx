import React from 'react';
import { AppButton } from '../../../ui/AppButton';

interface IUserListItemButtonsProps {
  isUserBanned: boolean;
  unbanUserHandler: () => void;
  onOpenBanUserModal: () => void;
  onOpenRolesModal: () => void;
}

export const UserListItemButtons = ({
  isUserBanned,
  unbanUserHandler,
  onOpenBanUserModal,
  onOpenRolesModal
}: IUserListItemButtonsProps) => {
  if (isUserBanned) {
    return (
      <AppButton text="Unban user" color="danger" onClick={unbanUserHandler} />
    );
  }

  return (
    <>
      <AppButton text="Ban user" color="danger" onClick={onOpenBanUserModal} />
      <AppButton text="User roles" onClick={onOpenRolesModal} />
    </>
  );
};
