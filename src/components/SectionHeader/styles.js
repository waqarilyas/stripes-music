import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  // right: {
  //   backgroundColor: '#1B1B1B',
  //   padding: wp('2'),
  //   borderRadius: hp('1'),
  // },
  rightText: {
    color: 'white',
    fontSize: wp('4'),
  },
  leftIcon: {
    resizeMode: 'contain',
    height: hp('5'),
    width: hp('5'),
  },
});

export default styles;
