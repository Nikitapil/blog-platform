import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { AppInput } from '../ui/AppInput';
import { AppButton } from '../ui/AppButton';
import styles from '../../assets/styles/profile.module.scss';
import { useModalError } from '../../hooks/utils/useModalError';
import { ErrorMessage } from '../ui/ErrorMessage';

interface IChangeTextParamModalProps {
  isOpened: boolean;
  id: string;
  placeholder: string;
  title: string;
  error?: string;
  initialValue?: string;
  closeModal: () => void;
  submitHandler: (text: string) => void;
}

export const ChangeTextParamModal = ({
  isOpened,
  closeModal,
  submitHandler,
  id,
  placeholder,
  title,
  initialValue,
  error = ''
}: IChangeTextParamModalProps) => {
  const [value, setValue] = useState('');
  const { setSaved } = useModalError(isOpened, error, closeModal);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const save = async () => {
    setSaved(false);
    await submitHandler(value);
    setSaved(true);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <div className={styles['change-name']}>
        <h2 className={styles['change-name__title']}>{title}</h2>
        <AppInput
          id={id}
          value={value}
          onChange={inputHandler}
          placeholder={placeholder}
          name={id}
        />
        {error && <ErrorMessage message={error} />}
        <div className="flex-end">
          <AppButton text="Save" color="success" onClick={save} size="md" />
        </div>
      </div>
    </Modal>
  );
};
