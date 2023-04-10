import React from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../ui/IconButton';

interface IEditDeletePostButtonsProps {
  canEdit: boolean;
  canDelete: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const EditDeletePostButtons = ({
  canEdit,
  canDelete,
  onEdit,
  onDelete
}: IEditDeletePostButtonsProps) => {
  return (
    <div className="d-flex gap-5 align-center">
      {canEdit && <IconButton icon={faEdit} type="button" onClick={onEdit} />}
      {canDelete && (
        <IconButton icon={faTrash} type="button" onClick={onDelete} />
      )}
    </div>
  );
};
