import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: hp('2'),
  },
  list: {
    marginVertical: hp('2'),
    height: '100%',
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: hp('1'),
    marginVertical: hp('2'),
  },
});

export default styles;
