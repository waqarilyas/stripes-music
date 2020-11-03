import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: 145,
  },
  image: {
    justifyContent: 'center',
    height: hp('18'),
    width: hp('18'),
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  noSongs: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    padding: 6,
  },
  badge: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    bottom: 9,
    right: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: hp('0.5'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: hp('2'),
    color: 'white',
  },
  privateContainer: {
    backgroundColor: 'rgba(245, 20, 142, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 3,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  publicContainer: {
    backgroundColor: 'rgba(0, 128, 0, 0.5)',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 3,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  status: {
    color: 'white',
    fontSize: 10,
  },
  viewCountContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  viewCount: {
    color: 'white',
    fontSize: 10,
    marginLeft: 4,
  },
  icon: {
    resizeMode: 'contain',
    width: hp('2'),
    height: hp('2'),
    tintColor: 'gray',
  },
});

export default styles;
