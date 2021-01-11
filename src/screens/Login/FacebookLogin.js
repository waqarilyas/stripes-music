import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const onFacebookButtonPress = async () => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const response = await auth().signInWithCredential(facebookCredential);
    const document = await firestore()
      .collection('users')
      .doc(response.user.uid)
      .get();

    if (document.exists) {
      firestore().collection('users').doc(response.user.uid).update({
        fbAccessToken: data.accessToken,
        fbUserId: data.userID,
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
          fbAccessToken: data.accessToken,
          googleAccessToken: '',
          fbUserId: data.userID,
          profilePicture: '',
          isAdmin: false,
        });
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default onFacebookButtonPress;
