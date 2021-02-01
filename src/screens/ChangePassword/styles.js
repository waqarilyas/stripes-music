import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    flex: 1,
    marginVertical: hp('1'),
    backgroundColor: '#e0ebeb',
    paddingRight: 8,
  },
  textInput: {
    padding: hp('1.5'),
    fontSize: 16,
    borderRadius: 5,
    flex: 1,
  },
  modalMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  postContainer: {
    backgroundColor: '#d1e0e0',
    borderRadius: hp('1'),
    padding: hp('3'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#000',
    marginLeft: widthPercentageToDP('2%'),
    fontSize: 14,
  },
  successImage: {
    resizeMode: 'contain',
    height: hp('4'),
    width: hp('4'),
  },
});

export default styles;
