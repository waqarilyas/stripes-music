import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: hp('3'),
  },
  detail: {
    flexDirection: 'column',
    marginLeft: hp('2'),
  },
  video: {
    width: hp('24'),
    height: hp('14'),
    borderRadius: hp('1'),
  },
  title: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  artist: {
    color: 'gray',
    fontSize: hp('1.8'),
    fontWeight: 'bold',
    marginTop: hp('0.5'),
  },
  views: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
  },
  icon: {
    resizeMode: 'contain',
    width: hp('2'),
    height: hp('2'),
  },
  viewCount: {
    color: 'gray',
    marginLeft: hp('1'),
    fontSize: hp('2'),
  },
  likes: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  background: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: hp('1'),
  },
  duration: {
    color: 'white',
    fontSize: hp('1.5'),
    padding: 6,
  },
});

export default styles;
