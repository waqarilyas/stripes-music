import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: hp('16'),
    height: hp('10'),
    margin: hp('1'),
    borderRadius: hp('1'),
  },
  text: {
    fontSize: hp('1'),
    color: 'white',
  },
});

export default styles;
