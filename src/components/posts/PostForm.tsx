import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import SimpleMdeReact, { SimpleMDEReactProps } from 'react-simplemde-editor';
import { toast } from 'react-toastify';
import { AppInput } from '../ui/AppInput';
import { FileUploader } from '../ui/FileUploader';
import { imageExtensions } from '../../constants/file-extensions';
import { postValidation } from '../../helpers/post-validation';
import { AppButton } from '../ui/AppButton';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { TPost, TPostRequest } from '../../types/posts';
import styles from '../../assets/styles/posts.module.scss';
import { imgURLToFile } from '../../helpers/img-helpers';
import 'easymde/dist/easymde.min.css';
import { TagInput } from '../ui/TagInput';
import { ImagePreview } from '../ui/ImagePreview';
import { authSelector } from '../../store/selectors';

interface PostFormProps {
  submitFn: (params: TPostRequest) => Promise<AxiosResponse<TPost>>;
  isSubmitting: boolean;
  submitError: string;
  submitButtonText: string;
  post?: TPost;
  submitToast?: string;
}

export const PostForm = ({
  submitFn,
  isSubmitting,
  submitError,
  post,
  submitButtonText,
  submitToast = ''
}: PostFormProps) => {
  const { user, isAuthLoading } = useAppSelector(authSelector);
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);

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
        image,
        tags
      });
      if (!submitError) {
        navigate(`/posts/${response.data.id}`);
        if (submitToast) {
          toast.success(submitToast);
        }
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

  const contentChangeHandler = useCallback(
    (value: string) => {
      form.values.content = value;
      form.setFieldValue('content', value);
    },
    [form]
  );

  const contentOptions = useMemo(() => {
    return {
      autofocus: false,
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: 'ContentId',
        delay: 1000
      },
      placeholder: 'Enter content text...',
      status: false,
      showIcons: ['code', 'horizontal-rule', 'undo', 'redo'],
      hideIcons: ['guide', 'preview', 'side-by-side'],
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    } as SimpleMDEReactProps;
  }, []);

  const getImage = async (link: string) => {
    const img = await imgURLToFile(link);
    setImage(img);
  };

  useEffect(() => {
    if (post && post.image) {
      getImage(post.image);
    }
    if (post) {
      setTags([...post.hashtags]);
    }
  }, [post]);

  if (!user && !isAuthLoading) {
    return <Navigate to="/" />;
  }

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
        <SimpleMdeReact
          value={form.values.content}
          onChange={contentChangeHandler}
          options={contentOptions}
        />
        {form.errors.content && (
          <p className={styles.form__error}>Content is required</p>
        )}
        <TagInput
          id="post-hashtag"
          name="post-hashtag"
          placeholder="Hashtag..."
          tags={tags}
          setTags={setTags}
        />
        <div className={styles.form__controls}>
          <div>
            <FileUploader
              id="file"
              label={uploadLinkText}
              setFile={setImage}
              formats={imageExtensions}
            />
            <ImagePreview image={image} deleteImage={deleteImage} />
          </div>
          <AppButton text={submitButtonText} color="success" type="submit" />
        </div>
      </form>
    </main>
  );
};
