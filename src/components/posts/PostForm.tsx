import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { AppInput } from '../ui/AppInput';
import { AppTexArea } from '../ui/AppTextArea';
import { FileUploader } from '../ui/FileUploader';
import { imageExtensions } from '../../constants/file-extensions';
import { useImageLink } from '../../hooks/utils/useImageLink';
import { IconButton } from '../ui/IconButton';
import { postValidation } from '../../helpers/post-validation';
import { AppButton } from '../ui/AppButton';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { TPost, TPostRequest } from '../../types/posts';
import styles from '../../assets/styles/posts.module.scss';
import { imgURLToFile } from '../../helpers/img-helpers';

interface PostFormProps {
  submitFn: (params: TPostRequest) => Promise<AxiosResponse<TPost>>;
  isSubmitting: boolean;
  submitError: string;
  submitButtonText: string;
  post?: TPost;
}

export const PostForm = ({
  submitFn,
  isSubmitting,
  submitError,
  post,
  submitButtonText
}: PostFormProps) => {
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const [image, setImage] = useState<File | null>(null);
  const previewLink = useImageLink(image);
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      title: post?.title || '',
      content: post?.content || ''
    },
    validate: postValidation,
    onSubmit: async (values) => {
      const response = await submitFn({
        title: values.title,
        content: values.content,
        userId: user!.id.toString(),
        id: post?.id,
        imageName: post?.image,
        image
      });
      if (!submitError) {
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

  const getImage = async (link: string) => {
    const img = await imgURLToFile(link);
    setImage(img);
  };

  useEffect(() => {
    if (post && post.image) {
      getImage(post.image);
    }
  }, [post]);

  return (
    <main className="container">
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.form__title}>Create post</h2>
        {submitError && (
          <p className={styles.form__error}>Error: {submitError}</p>
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          <AppButton text={submitButtonText} color="success" type="submit" />
        </div>
      </form>
    </main>
  );
};
