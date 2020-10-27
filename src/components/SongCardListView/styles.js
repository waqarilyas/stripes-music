import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    resizeMode: 'cover',
    height: hp('10'),
    width: hp('10'),
    overflow: 'hidden',
    borderRadius: 10,
  },
  subtitle: {
    color: 'gray',
    marginTop: hp('0.7'),
  },
  duration: {
    color: 'gray',
    fontWeight: 'bold',
    paddingHorizontal: hp('1.5'),
  },
  tintedIcon: {
    tintColor: '#e81093',
  },
  icon: {
    tintColor: 'gray',
  },
  likeImage: {
    resizeMode: 'contain',
    height: hp('2'),
    width: hp('2'),
  },
});

export default styles;
