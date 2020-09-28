import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    height: hp('20'),
    width: hp('34'),
    borderRadius: hp('2'),
    margin: hp('1'),
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: hp('20'),
    width: hp('34'),
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  songName: {
    fontSize: hp('3'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: hp('4'),
  },
  subText: {
    fontSize: wp('3'),
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: hp('5'),
    marginTop: hp('1'),
  },
  text: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    width: '100%',
  },
});

export default styles;
