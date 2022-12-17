import React, { useMemo } from 'react';
import { useFormik } from 'formik';
import { AppInput } from '../ui/AppInput';
import styles from '../../assets/styles/auth.module.scss';
import { AppButton } from '../ui/AppButton';
import { createAuthValidation } from '../../helpers/auth-validation';
import { AuthFormData } from '../../types/auth-form';
import { useAppSelector } from '../../hooks/store/useAppSelector';
import { ErrorMessage } from '../ui/ErrorMessage';

interface AuthFormProps {
  isSignUp?: boolean;
  closeModal: () => void;
  onSubmit: (values: AuthFormData) => void;
}

export const AuthForm = ({
  closeModal,
  onSubmit,
  isSignUp = false
}: AuthFormProps) => {
  const { signError } = useAppSelector((state) => state.auth);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      userName: ''
    },
    validate: createAuthValidation(isSignUp),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  const title = useMemo(() => {
    return isSignUp ? 'Sign Up' : 'Sign in';
  }, [isSignUp]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
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
      {signError && <ErrorMessage message={signError} />}
    </form>
  );
};
