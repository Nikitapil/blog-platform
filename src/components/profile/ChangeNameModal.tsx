import React from 'react';
import { Modal } from '../ui/Modal';

interface ChangeNameModalProps {
  isOpened: boolean;
  closeModal: () => void;
}

export const ChangeNameModal = ({
  isOpened,
  closeModal
}: ChangeNameModalProps) => {
  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      sdad
    </Modal>
  );
};
