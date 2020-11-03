import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topView: {
    flexShrink: 1,
    alignItems: 'center',
    marginVertical: hp('6'),
    marginHorizontal: hp('3'),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('3'),
    textAlign: 'center',
  },
  subtitle: {
    color: 'grey',
    textAlign: 'center',
    marginTop: hp('2'),
  },
  divider: {
    marginVertical: 12,
    backgroundColor: 'black',
  },
});

export default styles;
