import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { NETWORK_ERROR, EMAIL_ALREADY_IN_USE } from '../../utils/Constants';

const RegisterUser = async (values, actions, navigation) => {
  try {
    await auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((result) => {
        firestore()
          .collection('users')
          .doc(result.user.uid)
          .set({
            id: result.user.uid,
            fullName: values.name,
            email: values.email,
            isAnonymous: false,
            isPaidUser: false,
            isActive: false,
            createdAt: +new Date(),
            updatedAt: +new Date(),
            subscribedAt: null,
            fbAccessToken: '',
            googleAccessToken: '',
            fbUserId: '',
            profilePicture: '',
            isAdmin: false,
          });
      });
    navigation.goBack();
    console.log(values);
  } catch (authErrors) {
    actions.setSubmitting(false);

    let message = '';
    switch (authErrors.code) {
      case NETWORK_ERROR:
        message = 'No internet connection';
        setError(actions, '', message);
        break;
      case EMAIL_ALREADY_IN_USE:
        message = 'Accout already in use. Try Login';
        setError(actions, message, '');
        break;
    }
  }
};

const setError = (actions, emailErr = '', globalErr = '') => {
  actions.setErrors({
    email: emailErr,
    globalError: globalErr,
  });
};

export default RegisterUser;
