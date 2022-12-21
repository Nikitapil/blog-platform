import React from 'react';
import { TPost } from '../../types/posts';
import { createImgLink } from '../../helpers/img-helpers';

interface PostListItemProps {
  post: TPost;
}

export const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <div>
      <div>
        <img src={createImgLink(post.image)} alt={post.title} />
      </div>
      <div>
        <h1>{post.title}</h1>
      </div>
    </div>
  );
};
