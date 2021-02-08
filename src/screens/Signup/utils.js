import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { NETWORK_ERROR, EMAIL_ALREADY_IN_USE } from '../../utils/Constants';

const RegisterUser = async (values, actions, navigation, setLoading) => {
  try {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((result) => {

        result.user.updateProfile({ displayName: values.name });


        firestore().collection('users').doc(result.user.uid).set({
          id: result.user.uid,
          fullName: values.name,
          email: values.email,
          isAnonymous: false,
          isPaidUser: false,
          isActive: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
          subscribedAt: null,
          fbAccessToken: '',
          googleAccessToken: '',
          fbUserId: '',
          profilePicture: '',
          isAdmin: false,
        });
      });
    navigation.navigate('MainTabs');
  } catch (authErrors) {
    setLoading(false);

    let message = '';
    switch (authErrors.code) {
      case NETWORK_ERROR:
        message = 'No internet connection';
        actions.setFieldError('globalErr', message);
        break;
      case EMAIL_ALREADY_IN_USE:
        message = 'Account already in use. Try Login';
        actions.setFieldError('email', message);
        break;
    }
  }
};

export default RegisterUser;
