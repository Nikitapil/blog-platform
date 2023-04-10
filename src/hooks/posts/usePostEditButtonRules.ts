import { useMemo } from 'react';
import { TUser } from '../../types/auth-form';

interface IUsePostEditButtonRulesParams {
  user: TUser | null;
  editableItem: { userId: number } | null;
}

export const usePostEditButtonRules = ({
  user,
  editableItem
}: IUsePostEditButtonRulesParams) => {
  const buttonRules = useMemo(() => {
    if (!user || !editableItem) {
      return { canEdit: false, canDelete: false };
    }
    const isUserEqual = user?.id === editableItem?.userId;
    return {
      canEdit: isUserEqual,
      canDelete: isUserEqual || user.isAdmin
    };
  }, [user, editableItem]);

  return buttonRules;
};
