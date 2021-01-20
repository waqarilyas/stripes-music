import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    borderRadius: 10,
    height: hp(4),
    paddingHorizontal: hp(1),
    marginHorizontal: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5138E',
  },
  text: {
    fontSize: RFValue(10),
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
    height: hp(6),
    width: wp(6),
    marginStart: wp(2),
  },
});

export default styles;
