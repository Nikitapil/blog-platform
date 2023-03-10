import React from 'react';
import { Modal } from '../../ui/Modal';

export const BanUserModal = () => {
  return (
    <Modal isOpened={false} closeModal={() => {}}>
      <div>
        <h2>Ban User</h2>
      </div>
    </Modal>
  );
};
