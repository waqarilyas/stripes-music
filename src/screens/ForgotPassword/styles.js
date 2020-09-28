import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
    marginHorizontal: wp('3'),
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: hp('3'),
  },
  headerIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
  },
  topText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: hp('5'),
    paddingHorizontal: hp('4'),
  },
  error: {
    color: '#B22222',
    marginVertical: hp('1'),
    marginLeft: hp('1'),
  },
  message: {
    color: '#ADFF2F',
    marginVertical: hp('1'),
    textAlign: 'center',
  },
  globalError: {
    color: '#B22222',
    marginVertical: hp('1'),
    textAlign: 'center',
  },
});

export default styles;
