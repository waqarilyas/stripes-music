import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

const onGoogleButtonPress = async (setVisibility) => {
  try {
    setVisibility(true);
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const response = await auth().signInWithCredential(googleCredential);
    const document = await firestore()
      .collection('users')
      .doc(response.user.uid)
      .get();

    if (document.exists) {
      firestore().collection('users').doc(response.user.uid).update({
        googleAccessToken: idToken,
      });
    } else {
      return firestore().collection('users').doc(response.user.uid).set({
        id: response.user.uid,
        fullName: response.user.displayName,
        email: response.user.email,
        isPaidUser: false,
        isActive: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        subscribedAt: null,
        fbAccessToken: '',
        googleAccessToken: idToken,
        fbUserId: '',
        profilePicture: '',
        isAdmin: false,
      });
    }
    return true
  } catch (err) {
    setVisibility(false);
    throw err;
  }
};

export default onGoogleButtonPress;
