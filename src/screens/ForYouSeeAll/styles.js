import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: hp('4'),
    fontSize: hp('2.5'),
  },
  topTextContainer: {
    marginHorizontal: hp('3'),
  },
});

export default styles;
