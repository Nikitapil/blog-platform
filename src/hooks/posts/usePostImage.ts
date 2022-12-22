import { useMemo } from 'react';
import { TPost } from '../../types/posts';
import { createImgLink } from '../../helpers/img-helpers';

export const usePostImage = (post: TPost | null) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const image = useMemo(() => {
    if (!post || !post.image) {
      return null;
    }
    return createImgLink(post.image);
  }, [post]);
  return image;
};
