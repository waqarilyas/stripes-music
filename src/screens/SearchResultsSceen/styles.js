import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  searchWithClose: {
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
});

export default styles;
