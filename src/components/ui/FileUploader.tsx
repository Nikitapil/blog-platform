import React, { useState } from 'react';
import styles from '../../assets/styles/uploader.module.scss';

interface FileUploaderProps {
  id: string;
  label: string;
  setFile: (file: File | null) => void;
  formats: string[];
}

export const FileUploader = ({
  id,
  label,
  setFile,
  formats
}: FileUploaderProps) => {
  const [formatError, setFormatError] = useState('');

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormatError('');
    if (e.target.files) {
      const file = e.target.files[0];
      const splitted = file.name.split('.');
      const ext = splitted[splitted.length - 1];
      if (!formats.includes(ext)) {
        setFile(null);
        setFormatError(`Invalid format. Available: ${formats.join(', ')}`);
        return;
      }
      setFile(file);
    }
  };

  return (
    <div className={styles.uploader}>
      <input type="file" id={id} onChange={uploadHandler} />
      <label htmlFor={id}>{label}</label>
      {formatError && <p className={styles.error}>{formatError}</p>}
    </div>
  );
};
