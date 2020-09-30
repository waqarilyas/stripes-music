import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: hp('30'),
    width: hp('32'),
    margin: hp('1'),
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: hp('20'),
    width: hp('32'),
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  title: {
    fontSize: hp('2.5'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: hp('4'),
  },
  artist: {
    fontSize: wp('3'),
    color: 'white',
    marginTop: hp('1'),
    textAlign: 'center',
  },
});

export default styles;
