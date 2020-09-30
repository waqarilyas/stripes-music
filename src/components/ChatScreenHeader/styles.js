import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  leftContainer: {
    backgroundColor: '#fc0c8c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  leftText: {
    color: 'white',
  },
  search: {
    resizeMode: 'contain',
    height: wp('5'),
    width: wp('5'),
    marginHorizontal: hp(1),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
