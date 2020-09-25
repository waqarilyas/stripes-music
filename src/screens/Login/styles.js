import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: hp('3.5'),
    marginBottom: hp('6'),
    marginTop: hp('2'),
  },
  topText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: hp('6'),
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: hp('2.5'),
  },
  input: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp('2'),
    padding: hp('1'),
    paddingLeft: hp('1'),
    borderRadius: hp('2'),
  },
  inputIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    marginHorizontal: hp('2'),
  },
  loginButton: {
    backgroundColor: '#F5138E',

    alignSelf: 'center',
    height: hp('6'),
    width: hp('15'),
    borderRadius: hp('1.2'),
    marginVertical: hp('3'),
  },
  loginButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: hp('2'),
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
    height: hp('7'),
    width: hp('24'),
    marginVertical: hp('1'),
    alignItems: 'center',
    borderRadius: hp('1 '),
    justifyContent: 'space-around',
  },
  socialButtonText: {
    fontWeight: 'bold',
    fontSize: hp('2.5'),
  },
  signupText: {
    color: '#ffffff',
    fontSize: hp('2'),
    marginTop: hp('1'),
  },
  socialIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
  },
  faceBookButton: {
    backgroundColor: '#3B5998',
    height: hp('7'),
    width: hp('24'),
    marginVertical: hp('1'),
    borderRadius: hp('1 '),
    fontWeight: 'bold',
    justifyContent: 'space-around',
  },
  signupSection: {
    alignItems: 'center',
  },
  signup: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: hp('2.5'),
  },
});

export default styles;
