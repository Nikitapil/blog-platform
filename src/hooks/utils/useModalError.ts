import { useEffect, useState } from 'react';

export const useModalError = (
  isOpened: boolean,
  error: string,
  closeModal: () => void
) => {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (isOpened) {
      setSaved(false);
    }
  }, [isOpened]);

  useEffect(() => {
    if (saved && !error) {
      closeModal();
    }
  }, [saved, error]);
  return { setSaved };
};
