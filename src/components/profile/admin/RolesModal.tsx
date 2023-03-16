import React, { useEffect, useState } from 'react';

import { Modal } from '../../ui/Modal';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { TUserRole } from '../../../types/auth-form';
import { AppCheckBox } from '../../ui/AppCheckBox';

interface RolesModalProps {
  isOpened: boolean;
  closeModal: () => void;
  userName: string;
  userRoles: TUserRole[];
}

export const RolesModal = ({
  isOpened,
  closeModal,
  userName,
  userRoles
}: RolesModalProps) => {
  const [internalRoles, setInternalRoles] = useState<
    (TUserRole & { checked: boolean })[]
  >([]);
  const { roles } = useAppSelector((state) => state.admin);

  useEffect(() => {
    setInternalRoles(
      roles.map((role) => ({
        ...role,
        checked: !!userRoles.find((r) => r.id === role.id)
      }))
    );
  }, [roles]);

  const changeRoleHandler = (value: boolean, id: number) => {
    setInternalRoles(
      internalRoles.map((role) => {
        if (role.id === id) {
          return { ...role, checked: value };
        }
        return role;
      })
    );
  };

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <div>
        <h2>Choose roles for {userName}</h2>
      </div>
      <div>
        {internalRoles.map((role) => (
          <AppCheckBox
            key={role.id}
            label={role.value}
            id={role.id.toString()}
            value={role.checked}
            setValue={(val) => changeRoleHandler(val, role.id)}
          />
        ))}
      </div>
    </Modal>
  );
};
