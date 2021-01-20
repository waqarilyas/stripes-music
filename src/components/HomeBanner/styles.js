import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: hp('20'),
    width: hp('34'),
    borderRadius: hp('2'),
    margin: hp('1'),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: hp('1'),
  },
  icon: {
    height: hp('6'),
    width: hp('6'),
    tintColor: 'white',
  },
});

export default styles;
