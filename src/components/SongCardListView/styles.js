import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  image: {
    resizeMode: 'cover',
    height: hp('10'),
    width: hp('10'),
    overflow: 'hidden',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
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
});

export default styles;
