import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { useProfileActions } from '../../hooks/store/useProfileActions';
import { PostListWithToggle } from '../../components/posts/post-list/PostListWithToggle';
import { profileSelector } from '../../store/selectors';

export const UserPosts = () => {
  const { id } = useParams();
  const { getUserPosts } = useProfileActions();
  const { userPosts, isUserPostsLoading } = useAppSelector(profileSelector);

  useEffect(() => {
    if (id) {
      getUserPosts(id);
    }
  }, [getUserPosts, id]);

  return (
    <PostListWithToggle posts={userPosts} isPostsLoading={isUserPostsLoading} />
  );
};
