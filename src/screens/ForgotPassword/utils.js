import auth from '@react-native-firebase/auth';

import {
  USER_NOT_FOUND,
  NETWORK_ERROR,
  USER_DISABLED,
} from '../../utils/Constants';

const ResetPassword = async (values, actions, navigation) => {
  console.log('email', values);
  try {
    await auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        actions.setSubmitting(false);
        actions.setErrors({ isSent: true });
      });
    navigation.goBack();
  } catch (authErrors) {
    console.log(authErrors.code);
    actions.setSubmitting(false);

    let message = '';
    switch (authErrors.code) {
      case USER_NOT_FOUND:
        message = 'Not a registered email';
        setError(actions, '', message);
        break;
      case NETWORK_ERROR:
        message = 'No internet connection';
        setError(actions, '', message);
        break;
      case USER_DISABLED:
        message = 'Accout suspended, Contact Tech Support';
        setError(actions, '', message);
        break;
    }
  }
};

const setError = (actions, emailErr = '', globalErr = '') => {
  actions.setErrors({
    email: emailErr,
    globalErr,
  });
};

export default ResetPassword;
