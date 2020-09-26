import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingVertical: hp('3'),
    color: '#ffffff',
    fontSize: hp('2'),
  },
  input: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: hp('1'),
  },
  inputIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    marginHorizontal: hp('3'),
  },
  error: {
    color: '#B22222',
    marginVertical: hp('1'),
    marginLeft: hp('1'),
  },
});

export default styles;
