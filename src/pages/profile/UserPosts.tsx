import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { PostList } from '../../components/posts/PostList';
import { useProfileActions } from '../../hooks/store/useProfileActions';

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

  return <PostList posts={userPosts} isPostsLoading={isUserPostsLoading} />;
};
