import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: hp('28'),
    width: hp('19'),
    marginLeft: hp('1'),
  },
  image: {
    justifyContent: 'center',
    height: hp('18'),
    width: hp('18'),
    overflow: 'hidden',
    borderRadius: hp('1'),
  },
  noSongs: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('3'),
    padding: hp('1'),
  },
  badge: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    bottom: 9,
    right: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: hp('0.5'),
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 6,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: hp('1'),
    tintColor: 'gray',
    resizeMode: 'contain',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: hp('2'),
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default styles;
