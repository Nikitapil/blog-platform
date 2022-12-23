import React from 'react';

interface FileUploaderProps {
  id: string;
  label: string;
}

export const FileUploader = ({ id, label }: FileUploaderProps) => {
  return (
    <div>
      <input type="file" id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
