import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostList } from '../../components/posts/PostList';

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
    <PostList posts={userPostsLikes} isPostsLoading={isUserPostsLoading} />
  );
};
