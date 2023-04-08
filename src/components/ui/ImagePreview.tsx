import React, { memo } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from '../../assets/styles/image-preview.module.scss';
import { IconButton } from './IconButton';

interface ImagePreviewProps {
  image: File | null;
  deleteImage: () => void;
}

export const ImagePreview = memo(
  ({ image, deleteImage }: ImagePreviewProps) => {
    if (!image) {
      return null;
    }
    return (
      <div className={styles.preview}>
        <div className={styles['delete-img']}>
          <IconButton icon={faXmark} type="button" onClick={deleteImage} />
        </div>
        <img src={URL.createObjectURL(image)} alt="preview" />
      </div>
    );
  }
);
