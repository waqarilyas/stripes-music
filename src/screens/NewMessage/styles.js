import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: hp('4'),
  },
  intro: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp('2.5'),
    marginVertical: hp('3'),
  },
  container: {
    // marginVertical: 6,
    // marginHorizontal: 10,
  },
  label: {
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
  },
  userTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  spinnerContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
