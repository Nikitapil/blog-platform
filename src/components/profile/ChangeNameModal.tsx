import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { AppInput } from '../ui/AppInput';
import { AppButton } from '../ui/AppButton';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import styles from '../../assets/styles/profile.module.scss';

interface ChangeNameModalProps {
  isOpened: boolean;
  closeModal: () => void;
}

export const ChangeNameModal = ({
  isOpened,
  closeModal
}: ChangeNameModalProps) => {
  const [userName, setUserName] = useState('');
  const { updateUserName } = useProfileActions();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const save = async () => {
    await updateUserName(userName);
    closeModal();
  };

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <div className={styles['change-name']}>
        <h2 className={styles['change-name__title']}>Change username</h2>
        <AppInput
          id="username"
          value={userName}
          onChange={inputHandler}
          placeholder="Username..."
          name="username"
        />
        <div className="flex-end">
          <AppButton text="Save" color="success" onClick={save} size="md" />
        </div>
      </div>
    </Modal>
  );
};
