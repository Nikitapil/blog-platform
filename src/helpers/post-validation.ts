import { PostFormValues } from '../types/posts';

export const postValidation = (values: PostFormValues) => {
  const errors = {} as PostFormValues;

  if (!values.title.trim()) {
    errors.title = 'Title is required.';
  }

  if (!values.content.trim()) {
    errors.content = 'Post content is required';
  }

  return errors;
};
