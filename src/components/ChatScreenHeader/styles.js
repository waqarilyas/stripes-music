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
    height: '100%',
    borderRadius: 20,
  },
  leftText: {
    color: 'white',
    fontSize: hp('1.5'),
    fontWeight: 'bold',
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
  container: {
    backgroundColor: 'black',
    justifyContent: 'space-around',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    marginTop: 10,
    marginHorizontal: hp('1'),
  },
  avatar: {
    marginRight: hp('1'),
  },
});

export default styles;
