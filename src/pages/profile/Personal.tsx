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
import { ChangeNameModal } from '../../components/profile/ChangeNameModal';

export const Personal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isNameModalOpened, setIsNameModalOpened] = useState(false);
  // const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const { isAvatarLoading } = useAppSelector((state) => state.profile);
  const { setProfileName, updateAvatar, deleteAvatar } = useProfileActions();
  const navigate = useNavigate();
  const { id } = useParams();

  const onOpenNameModal = () => {
    setIsNameModalOpened(true);
  };

  const onCloseNameModal = () => {
    setIsNameModalOpened(false);
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
        return;
      }
      setProfileName(user.userName);
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
        <AppButton text="Change password" />
      </div>
      <ChangeNameModal
        isOpened={isNameModalOpened}
        closeModal={onCloseNameModal}
      />
    </div>
  );
};
