import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black',
    marginBottom: hp('1'),
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});

export default styles;
