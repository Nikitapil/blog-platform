import React, { useEffect, useMemo, useState } from 'react';

import { Modal } from '../../ui/Modal';
import { useAppSelector } from '../../../hooks/store/useAppSelector';
import { TUserRole, TUserUiRole } from '../../../types/auth-form';
import { AppCheckBox } from '../../ui/AppCheckBox';
import { AppButton } from '../../ui/AppButton';
import { useProfileActions } from '../../../hooks/store/useProfileActions';
import styles from '../../../assets/styles/profile.module.scss';

interface RolesModalProps {
  isOpened: boolean;
  closeModal: () => void;
  userName: string;
  userRoles: TUserRole[];
  userId: number;
}

export const RolesModal = ({
  isOpened,
  closeModal,
  userName,
  userRoles,
  userId
}: RolesModalProps) => {
  const [internalRoles, setInternalRoles] = useState<TUserUiRole[]>([]);
  const { roles } = useAppSelector((state) => state.admin);
  const { changeUserRoles } = useProfileActions();

  useEffect(() => {
    setInternalRoles(
      roles.map((role) => ({
        ...role,
        checked: !!userRoles?.find((r) => r.id === role.id)
      }))
    );
  }, [roles, userRoles]);

  const selectedRoles = useMemo(() => {
    return internalRoles.filter((role) => role.checked);
  }, [internalRoles]);

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

  const submitHandler = async () => {
    await changeUserRoles(internalRoles, userId);
    closeModal();
  };

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <div className={styles['roles-modal']}>
        <div>
          <h2 className="font-m">Choose roles for {userName}:</h2>
        </div>
        <div className="mt-10 flex-col gap-10">
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
        <div className="d-flex gap-10 flex-end">
          <AppButton text="Cancel" onClick={closeModal} color="danger" />
          <AppButton
            text="Save"
            color="success"
            onClick={submitHandler}
            disabled={!selectedRoles.length}
          />
        </div>
      </div>
    </Modal>
  );
};
