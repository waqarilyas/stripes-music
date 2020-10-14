import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 0,
    elevation: 0,
  },
  badgeText: {
    fontSize: 10,
  },
  badgeStyle: {
    backgroundColor: '#F5138E',
    borderWidth: 0,
  },
  image: {
    width: wp('20'),
    borderRadius: hp('100'),
    height: hp('10'),
  },
  label: {
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
  },
});
export default styles;
