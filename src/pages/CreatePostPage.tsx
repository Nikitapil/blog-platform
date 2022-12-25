import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AppInput } from '../components/ui/AppInput';
import { AppTexArea } from '../components/ui/AppTextArea';
import styles from '../assets/styles/posts.module.scss';
import { FileUploader } from '../components/ui/FileUploader';
import { imageExtensions } from '../constants/file-extensions';
import { useImageLink } from '../hooks/utils/useImageLink';
import { IconButton } from '../components/ui/IconButton';
import { postValidation } from '../helpers/post-validation';
import { AppButton } from '../components/ui/AppButton';
import { PostsService } from '../services/PostsService';
import { useAppSelector } from '../hooks/store/useAppSelector';
import { useRequest } from '../hooks/utils/useRequest';
import { TPost, TPostRequest } from '../types/posts';

export const CreatePostPage = () => {
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
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
  const [image, setImage] = useState<File | null>(null);
  const previewLink = useImageLink(image);
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validate: postValidation,
    onSubmit: async (values) => {
      const response = await createPost({
        title: values.title,
        content: values.content,
        userId: user!.id.toString(),
        image
      });
      if (!creatingError) {
        navigate(`/posts/${response.data.id}`);
      }
    }
  });

  const uploadLinkText = useMemo(() => {
    return image ? 'Update post cover' : 'Upload post cover';
  }, [image]);

  const deleteImage = () => setImage(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  useEffect(() => {
    if (!user && !isAuthLoading) {
      navigate('/');
    }
  }, [user, isAuthLoading]);

  return (
    <main className="container">
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.form__title}>Create post</h2>
        {creatingError && (
          <p className={styles.form__error}>Error: {creatingError}</p>
        )}
        <AppInput
          id="title"
          name="title"
          placeholder="Title"
          label="Title:"
          value={form.values.title}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          touched={form.touched.title}
          error={form.errors.title}
          disabled={isCreating}
        />
        <AppTexArea
          id="content"
          name="content"
          label="Post content:"
          placeholder=""
          value={form.values.content}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.errors.content}
          touched={form.touched.content}
          disabled={isCreating}
        />
        <div className={styles.form__controls}>
          <div>
            <FileUploader
              id="file"
              label={uploadLinkText}
              setFile={setImage}
              formats={imageExtensions}
            />
            {previewLink && (
              <div className={styles.preview}>
                <div className={styles['delete-img']}>
                  <IconButton
                    icon={faXmark}
                    type="button"
                    onClick={deleteImage}
                  />
                </div>
                <img src={previewLink} alt="preview" />
              </div>
            )}
          </div>
          <AppButton text="Create" color="success" type="submit" />
        </div>
      </form>
    </main>
  );
};
