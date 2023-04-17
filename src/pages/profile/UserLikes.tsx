import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostListWithToggle } from '../../components/posts/post-list/PostListWithToggle';
import { profileSelector } from '../../store/selectors';

export const UserLikes = () => {
  const { id } = useParams();
  const { getUserPostsLikes } = useProfileActions();
  const { userPostsLikes, isUserPostsLoading } =
    useAppSelector(profileSelector);

  useEffect(() => {
    if (id) {
      getUserPostsLikes(id);
    }
  }, [getUserPostsLikes, id]);

  return (
    <PostListWithToggle
      posts={userPostsLikes}
      isPostsLoading={isUserPostsLoading}
    />
  );
};
