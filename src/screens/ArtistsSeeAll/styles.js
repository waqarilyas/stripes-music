import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 28,
    fontSize: 14,
    lineHeight: 24,
    marginHorizontal: 20,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: hp('6'),
    marginVertical: hp('2'),
  },
});

export default styles;
