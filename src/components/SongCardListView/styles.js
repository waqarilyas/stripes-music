import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
  },
  cardImage: {
    resizeMode: 'contain',
    height: hp('8'),
    width: hp('8'),
    overflow: 'hidden',
    borderRadius: hp('1'),
  },
  subTitle: {
    color: '#808080',
    marginTop: hp('0.7'),
  },
  likeImage: {
    resizeMode: 'contain',
    height: hp('2'),
    width: hp('2'),
  },
});

export default styles;
