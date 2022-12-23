import React from 'react';
import { useFormik } from 'formik';
import { AppInput } from '../components/ui/AppInput';
import { AppTexArea } from '../components/ui/AppTextArea';
import styles from '../assets/styles/posts.module.scss';
import { FileUploader } from '../components/ui/FileUploader';

export const CreatePostPage = () => {
  const form = useFormik({
    initialValues: {
      title: '',
      content: '',
      file: ''
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });
  return (
    <main className="container">
      <form className={styles.form}>
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
        <FileUploader id="image" label="Upload post cover" />
      </form>
    </main>
  );
};
