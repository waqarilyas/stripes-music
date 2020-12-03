import auth from '@react-native-firebase/auth';
import {
  WRONG_PASSWORD,
  USER_NOT_FOUND,
  NETWORK_ERROR,
  USER_DISABLED,
} from '../../utils/Constants';

// Login user using Firebase Authentication
const LoginUser = async (values, actions, navigation) => {
  try {
    await auth().signInWithEmailAndPassword(values.email, values.password);
    navigation.goBack();
  } catch (authErrors) {
    console.log('-------------LOGIN ERROR----------', authErrors.code)
    actions.setSubmitting(false);

    let message = '';
    switch (authErrors.code) {
      case WRONG_PASSWORD:
        message = 'Invalid Credentials';
        setError(actions, message, message);
        break;
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
      default:
        message = 'Invalid email or password';
        setError(actions, '', message);
        break;
    }
  }
};

const setError = (actions, emailErr = '', passwordErr = '', globalErr = '') => {
  actions.setErrors({
    email: emailErr,
    password: passwordErr,
    globalError: globalErr,
  });
};

export default LoginUser;
