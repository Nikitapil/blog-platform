import React, { memo } from 'react';
import styles from '../../assets/styles/confirm-modal.module.scss';
import { AppButton } from '../ui/AppButton';
import { Modal } from '../ui/Modal';

interface IConfirmModalProps {
  title: string;
  isOpened: boolean;
  confirmText: string;
  cancelText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = memo(
  ({
    title,
    isOpened,
    onCancel,
    onConfirm,
    confirmText,
    cancelText
  }: IConfirmModalProps) => {
    return (
      <Modal isOpened={isOpened} closeModal={onCancel}>
        <div className={styles['confirm-modal']}>
          <h3>{title}</h3>
          <div className={styles['confirm-modal-btns']}>
            <AppButton text={cancelText} onClick={onCancel} />
            <AppButton text={confirmText} color="danger" onClick={onConfirm} />
          </div>
        </div>
      </Modal>
    );
  }
);
