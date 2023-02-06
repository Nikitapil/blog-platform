import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import avatarLogo from '../../assets/img/avatarTemplate.jpg';
import styles from '../../assets/styles/profile.module.scss';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { HorizontalLoader } from '../../components/ui/loaders/HorizontalLoader';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { FileUploader } from '../../components/ui/FileUploader';
import { imageExtensions } from '../../constants/file-extensions';
import { AppButton } from '../../components/ui/AppButton';
import { ChangePasswordModal } from '../../components/profile/ChangePasswordModal';
import { ChangeTextParamModal } from '../../components/profile/ChangeTextParamModal';

export const Personal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isNameModalOpened, setIsNameModalOpened] = useState(false);
  const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const { isAvatarLoading, usernameError } = useAppSelector(
    (state) => state.profile
  );
  const { updateAvatar, deleteAvatar, updateUserName } = useProfileActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const onOpenNameModal = () => {
    setIsNameModalOpened(true);
  };

  const onCloseNameModal = () => {
    setIsNameModalOpened(false);
  };

  const onOpenPasswordModal = () => {
    setIsPasswordModalOpened(true);
  };

  const onClosePasswordModal = () => {
    setIsPasswordModalOpened(false);
  };

  const avatar = useMemo(() => {
    return user?.avatar
      ? `${process.env.REACT_APP_API_URL}/${user.avatar}`
      : avatarLogo;
  }, [user, user?.avatar]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!user || user.id.toString() !== id) {
        navigate('error');
      }
    }
  }, [user, isAuthLoading, id]);

  useEffect(() => {
    if (file) {
      updateAvatar(file);
    }
  }, [file]);

  if (isAuthLoading) {
    return (
      <div>
        <HorizontalLoader />
      </div>
    );
  }

  return (
    <div className={styles.personal}>
      <div className={styles.personal__avatar}>
        {!isAvatarLoading && <img src={avatar} alt="User Avatar" />}
      </div>
      <div className={styles.personal__body}>
        <div className={styles['personal__avatar-btns']}>
          <FileUploader
            id="upload-avatar"
            label="Update avatar"
            setFile={setFile}
            formats={imageExtensions}
          />
          <AppButton text="Delete" onClick={deleteAvatar} />
        </div>
        <AppButton text="Change user name" onClick={onOpenNameModal} />
        <AppButton text="Change password" onClick={onOpenPasswordModal} />
      </div>
      <ChangeTextParamModal
        isOpened={isNameModalOpened}
        id="name"
        placeholder="Username..."
        title="Change username"
        closeModal={onCloseNameModal}
        submitHandler={updateUserName}
        error={usernameError}
      />
      <ChangePasswordModal
        isOpened={isPasswordModalOpened}
        closeModal={onClosePasswordModal}
      />
    </div>
  );
};
