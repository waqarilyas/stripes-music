import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: wp('20'),
    borderRadius: hp('100'),
    height: hp('10'),
    alignSelf: 'center',
  },
  label: {
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
  },
  placeholder: {
    height: '100%',
    backgroundColor: 'black',
  },
  count: {
    color: 'white',
    textAlign: 'center',
    marginTop: hp('1'),
    fontSize: hp('1.6'),
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    marginTop: hp('1'),
    fontSize: hp('1.3'),
  },
});
export default styles;
