import React from 'react';
import { PostsService } from '../services/PostsService';
import { useRequest } from '../hooks/utils/useRequest';
import { TPost, TPostRequest } from '../types/posts';
import { PostForm } from '../components/posts/PostForm';

export const CreatePostPage = () => {
  const [createPost, isCreating, creatingError] = useRequest<
    TPostRequest,
    TPost
  >(async (values: TPostRequest) => {
    return PostsService.createPost(
      values.title,
      values.content,
      values.image,
      values.userId
    );
  });

  return (
    <main className="container">
      <PostForm
        submitFn={createPost}
        isSubmitting={isCreating}
        submitError={creatingError}
        submitButtonText="Create"
      />
    </main>
  );
};
