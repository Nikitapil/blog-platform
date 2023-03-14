import React, { useMemo, useState } from 'react';
import { Modal } from '../../ui/Modal';
import { AppTexArea } from '../../ui/AppTextArea';
import { AppButton } from '../../ui/AppButton';
import styles from '../../../assets/styles/profile.module.scss';
import { useProfileActions } from '../../../hooks/store/useProfileActions';

interface BanUserModalProps {
  isOpened: boolean;
  closeModal: () => void;
  userName: string;
  userId: number;
}

export const BanUserModal = ({
  isOpened,
  closeModal,
  userName,
  userId
}: BanUserModalProps) => {
  const [banReason, setBanReason] = useState('');
  const { banUser } = useProfileActions();

  const onBanReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBanReason(e.target.value);
  };

  const isBanReasonExist = useMemo(() => {
    return !!banReason.trim();
  }, [banReason]);

  const onBanUser = async () => {
    await banUser(userId, banReason);
    setBanReason('');
    closeModal();
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
          <AppButton
            text="Ban"
            color="danger"
            onClick={onBanUser}
            disabled={!isBanReasonExist}
          />
        </div>
      </div>
    </Modal>
  );
};
