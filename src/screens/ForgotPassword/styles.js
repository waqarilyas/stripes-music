import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('5'),
    marginHorizontal: wp('3'),
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: hp('3'),
  },
  headerIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
  },
  topText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: hp('6'),
  },
  loginButton: {
    backgroundColor: '#F5138E',
    alignSelf: 'center',
    height: hp('6'),
    width: hp('15'),
    borderRadius: hp('1.2'),
    marginVertical: hp('3'),
  },
});

export default styles;
