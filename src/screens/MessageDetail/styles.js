import { Platform, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  time: {
    marginLeft: hp('2'),
    color: '#ACA9AC',
  },
  time2: {
    alignSelf: 'flex-end',
    marginRight: hp('2'),
    color: '#ACA9AC',
  },
  leftWrapper: {
    backgroundColor: '#212121',
    padding: 4,
  },
  rightWrapper: {
    backgroundColor: '#e81093',
    padding: 4,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  send: {
    tintColor: 'white',
    height: '100%',
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 14,
  },
  input: {
    backgroundColor: '#212121',
    borderRadius: hp('10'),
    paddingLeft: hp('3'),
    borderTopWidth: 0,
    marginHorizontal: hp('2'),
    marginVertical: hp('1.2'),
    paddingTop: 0,
  },

  textInput: {
    color: 'white',
    alignSelf: 'center',
    height: '100%',
    top: 3,
  },
  sendIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    flex: 1,
  },
});

export default styles;
