import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: hp('4'),
    fontSize: hp('3'),
  },
});

export default styles;
