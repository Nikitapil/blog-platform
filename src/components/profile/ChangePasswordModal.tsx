import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { AppInput } from '../ui/AppInput';
import { AppButton } from '../ui/AppButton';
import styles from '../../assets/styles/profile.module.scss';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useModalError } from '../../hooks/utils/useModalError';

interface IChangeNameModalProps {
  isOpened: boolean;
  passwordError: string;
  closeModal: () => void;
}

export const ChangePasswordModal = ({
  isOpened,
  closeModal,
  passwordError
}: IChangeNameModalProps) => {
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { updatePassword } = useProfileActions();
  const { setSaved } = useModalError(isOpened, passwordError, closeModal);

  const newPasswordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const oldPasswordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const save = async () => {
    setSaved(false);
    await updatePassword(oldPassword, password);
    setSaved(true);
  };

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <div className={styles['change-name']}>
        <h2 className={styles['change-name__title']}>Change username</h2>
        <AppInput
          id="old-password"
          value={oldPassword}
          onChange={oldPasswordInputHandler}
          placeholder="Old password..."
          name="old-password"
          label="Old password:"
          type="password"
        />
        <AppInput
          id="new-password"
          value={password}
          onChange={newPasswordInputHandler}
          placeholder="New password..."
          name="new-password"
          label="New password:"
          type="password"
        />
        {passwordError && <ErrorMessage message={passwordError} />}
        <div className="flex-end">
          <AppButton text="Save" color="success" onClick={save} size="md" />
        </div>
      </div>
    </Modal>
  );
};
