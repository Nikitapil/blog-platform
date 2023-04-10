import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { PostListWithToggle } from '../../components/posts/post-list/PostListWithToggle';

export const UserPosts = () => {
  const { id } = useParams();
  const { getUserPosts } = useProfileActions();
  const { userPosts, isUserPostsLoading } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (id) {
      getUserPosts(id);
    }
  }, [id]);

  return (
    <PostListWithToggle posts={userPosts} isPostsLoading={isUserPostsLoading} />
  );
};
