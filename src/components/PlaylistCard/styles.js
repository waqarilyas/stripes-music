import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: hp(23),
    width: hp(15),
    marginHorizontal: hp('1'),
    marginTop: hp('1'),
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: hp(15),
    width: hp(15),
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2'),
    marginTop: hp('2'),
  },
  artist: {
    color: '#787878',
    marginTop: hp('0.5'),
    fontSize: 12,
  },
  songsCount: {
    marginTop: hp('0.3'),
    fontSize: hp('1.5'),
    color: 'gray',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    backgroundColor: '#212121',
  },
});

export default styles;
