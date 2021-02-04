import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  error: {
    color: '#B22222',
    marginVertical: hp('1'),
    marginLeft: hp('1'),
  },
  globalError: {
    color: '#B22222',
    marginVertical: hp('1'),
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: hp('2'),
    color: '#ffffff',
    fontSize: hp('2'),
  },
  mainContainer: {
    marginTop: hp('6'),
  },
  input: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp('1'),
    padding: hp('1'),
    paddingLeft: hp('1'),
    borderRadius: hp('1'),
  },
  inputIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    marginHorizontal: hp('2'),
  },
  socialSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: '#ffffff',
    marginBottom: hp('3'),
  },
  socialSignInText: {
    color: '#918E8E',
    marginBottom: hp('1'),
  },
  socialButton: {
    backgroundColor: '#4285F4',
    height: hp('6'),
    width: hp('20'),
    marginVertical: hp('1'),
    alignItems: 'center',
    borderRadius: hp('1'),
    justifyContent: 'space-evenly',
  },
  socialButtonText: {
    fontWeight: 'bold',
    fontSize: hp('2'),
  },
  signupText: {
    color: 'white',
    fontSize: 14,
    marginTop: hp('2'),
  },
  faceBookButton: {
    backgroundColor: '#3B5998',
    height: hp('6'),
    width: hp('20'),
    marginVertical: hp('1'),
    borderRadius: hp('1'),
    fontWeight: 'bold',
    justifyContent: 'space-evenly',
  },
  signupSection: {
    alignItems: 'center',
    marginTop: hp('1'),
  },
  signup: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('3'),
    marginTop: hp('3'),
  },
});

export default styles;
