import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  time: {
    color: 'white',
    marginLeft: hp('2'),
    color: '#ACA9AC',
  },
  time2: {
    color: 'white',
    alignSelf: 'flex-end',
    marginRight: hp('2'),
    color: '#ACA9AC',
  },

  input: {
    backgroundColor: '#2C262B',
    borderRadius: hp('5'),
    paddingLeft: hp('3'),
    position: 'absolute',
    bottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hp('1'),
  },
  textInput: {
    color: '#ffffff',
    fontSize: hp('2'),
    flex: 4,
  },
  sendIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    flex: 1,
  },
});

export default styles;
