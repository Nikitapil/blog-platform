import React from 'react';
import { Transition } from 'react-transition-group';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../../assets/styles/modal.module.scss';
import '../../assets/styles/modal-transitions.scss';
import { IconButton } from './IconButton';

interface IModalProps {
  isOpened: boolean;
  children: JSX.Element | string | React.ReactNode;
  closeModal: () => void;
}

export const Modal = ({ isOpened, children, closeModal }: IModalProps) => {
  return (
    <Transition in={isOpened} timeout={200} unmountOnExit>
      {(state) => (
        <div className={`modal ${state} ${styles.modal}`}>
          <div className={styles.overlay} onClick={() => closeModal()} />
          <div className={`${styles.modal__content} modal__content`}>
            <div className={styles.close}>
              <IconButton
                icon={faXmark}
                type="button"
                onClick={() => closeModal()}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </Transition>
  );
};
