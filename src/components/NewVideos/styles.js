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
    width: 180,
    height: 120,
    borderRadius: hp('1'),
  },
  title: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  artist: {
    color: 'gray',
    fontSize: 14,
    marginTop: 6,
  },
  views: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: 16,
    height: 16,
    tintColor: 'rgba(255, 255, 255, 0.3)',
  },
  viewCount: {
    color: 'rgba(255, 255, 255, 0.3)',
    marginLeft: hp('1'),
    fontSize: 12,
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
