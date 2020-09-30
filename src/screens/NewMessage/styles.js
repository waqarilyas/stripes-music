import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('4'),
  },
});

export default styles;
