import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { AppInput } from '../ui/AppInput';
import styles from '../../assets/styles/auth.module.scss';
import { AppButton } from '../ui/AppButton';
import { createAuthValidation } from '../../helpers/auth-validation';

interface AuthFormProps {
  isSignUp?: boolean;
  closeModal: () => void;
}

export const AuthForm = ({ closeModal, isSignUp = false }: AuthFormProps) => {
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      userName: ''
    },
    validate: createAuthValidation(isSignUp),
    onSubmit: (values) => {
      console.log('submit');
      console.log(values);
    }
  });

  const title = useMemo(() => {
    return isSignUp ? 'Sign Up' : 'Sign in';
  }, [isSignUp]);

  return (
    <form className={styles.form} onSubmit={form.handleSubmit}>
      <h2>{title}</h2>
      <AppInput
        id="email"
        name="email"
        placeholder="email"
        label="Email:"
        type="email"
        value={form.values.email}
        onChange={form.handleChange}
        error={form.errors.email}
        touched={form.touched.email}
        onBlur={form.handleBlur}
      />
      <AppInput
        id="password"
        name="password"
        placeholder="password"
        label="Password:"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        touched={form.touched.password}
        onBlur={form.handleBlur}
      />
      {isSignUp && (
        <AppInput
          id="userName"
          name="userName"
          placeholder="Your name"
          label="User name:"
          type="text"
          value={form.values.userName}
          onChange={form.handleChange}
          error={form.errors.userName}
          touched={form.touched.userName}
          onBlur={form.handleBlur}
        />
      )}
      <div className={styles.form__btns}>
        <AppButton
          text="Cancel"
          type="button"
          color="danger"
          onClick={closeModal}
        />
        <AppButton text={title} type="submit" color="success" />
      </div>
    </form>
  );
};
