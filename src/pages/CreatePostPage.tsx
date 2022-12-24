import React, { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppInput } from '../components/ui/AppInput';
import { AppTexArea } from '../components/ui/AppTextArea';
import styles from '../assets/styles/posts.module.scss';
import { FileUploader } from '../components/ui/FileUploader';
import { imageExtensions } from '../constants/file-extensions';
import { useImageLink } from '../hooks/utils/useImageLink';
import { IconButton } from '../components/ui/IconButton';
import { postValidation } from '../helpers/post-validation';
import { AppButton } from '../components/ui/AppButton';

export const CreatePostPage = () => {
  const form = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    validate: postValidation,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  const [image, setImage] = useState<File | null>(null);
  const previewLink = useImageLink(image);

  const uploadLinkText = useMemo(() => {
    return image ? 'Update post cover' : 'Upload post cover';
  }, [image]);

  const deleteImage = () => setImage(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <main className="container">
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.form__title}>Create post</h2>
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
