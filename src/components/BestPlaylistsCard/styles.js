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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    width: hp('2'),
    height: hp('2'),
    marginTop: hp('1'),
    marginRight: hp('1'),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: hp('2'),
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 10,
    backgroundColor: 'rgb(44, 151, 75)',
    borderRadius: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});
export default styles;
