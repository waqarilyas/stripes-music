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
});

export default styles;
