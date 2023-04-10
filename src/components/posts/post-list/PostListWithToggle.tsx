import React, { useState } from 'react';
import { faBars, faGrip } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../../ui/IconButton';
import { TPost } from '../../../types/posts';
import { PostList } from './PostList';
import { PostPlateList } from './PostPlateList';

interface IPostListProps {
  posts: TPost[];
  isPostsLoading: boolean;
}

export const PostListWithToggle = ({
  posts,
  isPostsLoading
}: IPostListProps) => {
  const [isListView, setIsListView] = useState(true);

  const setListView = () => setIsListView(true);
  const setPlateView = () => setIsListView(false);

  return (
    <div>
      <div className="d-flex gap-5 mb-10">
        <IconButton
          className={isListView ? 'success-color' : ''}
          icon={faBars}
          type="button"
          onClick={setListView}
        />
        <IconButton
          className={!isListView ? 'success-color' : ''}
          icon={faGrip}
          type="button"
          onClick={setPlateView}
        />
      </div>
      {isListView ? (
        <PostList posts={posts} isPostsLoading={isPostsLoading} />
      ) : (
        <PostPlateList posts={posts} isPostsLoading={isPostsLoading} />
      )}
    </div>
  );
};
