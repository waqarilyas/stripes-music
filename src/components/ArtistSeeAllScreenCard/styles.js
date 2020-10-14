import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: hp('2'),
  },
  icon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
  },
});
export default styles;
