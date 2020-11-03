import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: hp('1'),
  },
  detail: {
    flexDirection: 'column',
    marginLeft: hp('2'),
  },
  video: {
    width: hp('20'),
    height: hp('11'),
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  artist: {
    color: 'white',
    fontSize: hp('1.5'),
    marginTop: 6,
  },
  views: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, 0.5)',
  },
  viewCount: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: hp('1'),
    fontSize: 12,
  },
  likes: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: hp('0.5'),
  },
  duration: {
    color: 'white',
    fontSize: 10,
    padding: 6,
  },
});

export default styles;
