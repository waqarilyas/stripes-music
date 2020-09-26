import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: hp('28'),
    width: hp('20'),
    margin: hp('2'),
    borderTopLeftRadius: hp('3'),
    borderTopRightRadius: hp('3'),
  },
  image: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: hp('20'),
    width: hp('20'),
    borderRadius: hp('3'),
    overflow: 'hidden',
  },
  noSongs: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('3'),
  },
  badge: {
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    bottom: 9,
    right: 9,
    padding: 5,
    borderRadius: hp('1'),
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: hp('2'),
    marginTop: hp('1'),
    color: 'white',
  },
  text: {
    color: '#6D6D6D',
  },
});
export default styles;
