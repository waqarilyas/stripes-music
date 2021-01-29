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
    // width: '100%',
    fontSize: 16,
    borderRadius: 5,
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#c4c4c4',
    marginLeft: widthPercentageToDP('2%'),
    fontSize: 12,
  },
  successImage: {
    resizeMode: 'contain',
    height: hp('4'),
    width: hp('4'),
  },
});

export default styles;
