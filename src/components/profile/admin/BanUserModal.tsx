import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { AppTexArea } from '../../ui/AppTextArea';
import { AppButton } from '../../ui/AppButton';
import styles from '../../../assets/styles/profile.module.scss';

interface BanUserModalProps {
  isOpened: boolean;
  closeModal: () => void;
  userName: string;
}

export const BanUserModal = ({
  isOpened,
  closeModal,
  userName
}: BanUserModalProps) => {
  const [banReason, serBanReason] = useState('');

  const onBanReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    serBanReason(e.target.value);
  };

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <div className={styles['ban-modal']}>
        <h2>
          Ban User{' '}
          <span className={styles['ban-modal__username']}>{userName}</span>
        </h2>
        <AppTexArea
          id="ban-reason"
          value={banReason}
          onChange={onBanReasonChange}
          onBlur={() => {}}
          placeholder="Ban reason..."
          name="ban-reason"
          size="sm"
        />
        <div className={styles['ban-modal__btns']}>
          <AppButton text="cancel" onClick={closeModal} />
          <AppButton text="Ban" color="danger" />
        </div>
      </div>
    </Modal>
  );
};
