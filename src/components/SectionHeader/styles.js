import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    marginBottom: hp('2'),
  },
  rightText: {
    color: 'white',
    fontSize: wp('4'),
  },
  leftIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    tintColor: 'white',
  },
  seeAll: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  background: {
    padding: 12,
    backgroundColor: 'rgba(33, 33, 33, 0.5)',
    borderRadius: hp('1'),
  },
  centerComponent: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2.4'),
  },
});

export default styles;
