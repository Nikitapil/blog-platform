import { AuthFormData } from '../types/auth-form';

// export const validate = (values: AuthFormData) => {
//   const errors: AuthFormData = {
//     email: '',
//     password: '',
//     userName: ''
//   };
//   if (!values.email) {
//     errors.email = 'Email required.';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address.';
//   }
//
//   if (!values.password) {
//     errors.password = 'Password required.';
//   } else if (values.password.length < 8) {
//     errors.password = 'Password minimum length is 8.';
//   }
//
//   if (!values.userName) {
//     errors.userName = 'User name is required.';
//   }
//   console.log(errors);
//   return errors;
// };

export const createAuthValidation = (isSignUp: boolean) => {
  return (values: AuthFormData) => {
    const errors = {} as AuthFormData;
    if (!values.email.trim()) {
      errors.email = 'Email required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address.';
    }

    if (!values.password.trim()) {
      errors.password = 'Password required.';
    } else if (values.password.length < 8) {
      errors.password = 'Password minimum length is 8.';
    }

    if (!values.userName.trim() && isSignUp) {
      errors.userName = 'User name is required.';
    }
    return errors;
  };
};
