import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: hp('2.5'),
  },
  input: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: hp('1.5'),
    padding: hp('0.5'),
    paddingLeft: hp('1'),
    borderRadius: hp('2'),
  },
  inputIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    marginHorizontal: hp('2'),
  },
});

export default styles;
