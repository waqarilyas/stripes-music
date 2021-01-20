import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#F5138E',
    alignSelf: 'center',
    height: hp('6'),
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    borderRadius: hp('1'),
    marginVertical: hp('3'),
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: hp('2'),
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    textTransform: 'uppercase',
  },
  loadingTextStyle: {
    fontWeight: 'bold',
    fontSize: hp('2'),
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: hp('1'),
    alignSelf: 'center',
    color: 'white',
  },
});

export default styles;
