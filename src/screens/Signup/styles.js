import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
  signupButtonText: {
    fontWeight: 'bold',
    fontSize: hp('2'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
    marginHorizontal: wp('3'),
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: hp('3'),
    marginBottom: hp('4'),
  },
  headerIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
  },
  topText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: hp('6'),
  },
  loginButton: {
    backgroundColor: '#F5138E',
    alignSelf: 'center',
    height: hp('6'),
    width: hp('16'),
    borderRadius: hp('1'),
    marginVertical: hp('4'),
  },
  forgotPassword: {
    color: 'white',
    marginBottom: hp('2'),
  },
  signupText: {
    color: 'white',
    fontSize: 12,
    marginTop: hp('1'),
  },
  signupSection: {
    alignItems: 'center',
  },
  signup: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('3'),
    marginTop: hp('2'),
  },
  loginSection: {
    alignItems: 'center',
  },
});

export default styles;
