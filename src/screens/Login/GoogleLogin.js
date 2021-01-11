import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';

const onGoogleButtonPress = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log(idToken);

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
      firestore()
        .collection('users')
        .doc(response.user.uid)
        .set({
          id: response.user.uid,
          fullName: response.user.displayName,
          email: response.user.email,
          isPaidUser: false,
          isActive: false,
          createdAt: +new Date(),
          updatedAt: +new Date(),
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
    console.log(err);
    return false
  }
};

export default onGoogleButtonPress;
