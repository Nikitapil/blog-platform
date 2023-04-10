import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostListWithToggle } from '../../components/posts/post-list/PostListWithToggle';

export const UserLikes = () => {
  const { id } = useParams();
  const { getUserPostsLikes } = useProfileActions();
  const { userPostsLikes, isUserPostsLoading } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (id) {
      getUserPostsLikes(id);
    }
  }, [id]);

  return (
    <PostListWithToggle
      posts={userPostsLikes}
      isPostsLoading={isUserPostsLoading}
    />
  );
};
