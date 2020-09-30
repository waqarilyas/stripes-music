import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: hp('3'),
    fontSize: hp('3'),
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: hp('2'),
    marginVertical: hp('0.5'),
  },
});

export default styles;
