import { useEffect, useState } from 'react';

export const useImageLink = (file: File | null) => {
  const [link, setLink] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setLink(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const { result } = e.target!;
      setLink(result as string);
    };

    fileReader.readAsDataURL(file);

    return () => {
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return link;
};
