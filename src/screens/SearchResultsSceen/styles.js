import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'react-native';

const styles = StyleSheet.create({
  searchWithClose: {
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue('10'),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E3947',
    borderRadius: RFValue('10'),
    flex: 1,
    paddingHorizontal: RFValue('10'),
  },
  searchIcon: {
    resizeMode: 'contain',
    height: RFValue('16'),
    width: RFValue('16'),
    marginHorizontal: RFValue('10'),
  },
  textInput: {
    height: RFValue(35),
    margin: RFValue('5'),
    color: 'white',
    flex: 1,
    padding: 4,
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: RFValue('10'),
    // paddingHorizontal: RFValue('10'),
  },
  divider: {
    backgroundColor: 'transparent',
    marginVertical: 8,
  },
  backContainer: {
    paddingEnd: wp(3),
  },
  back: {
    resizeMode: 'contain',
  },
});

export default styles;
