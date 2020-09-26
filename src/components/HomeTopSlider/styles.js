import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: hp('27'),
    width: hp('40'),
    borderRadius: hp('2'),
    margin: hp('1'),
  },
  image: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: hp('27'),
    width: hp('40'),
    borderRadius: hp('2'),
    overflow: 'hidden',
  },
  songName: {
    fontSize: hp('5'),
    color: 'white',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: wp('5'),
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
