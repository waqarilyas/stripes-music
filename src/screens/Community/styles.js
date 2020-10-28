import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: hp('3'),
    fontSize: hp('3'),
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: hp('2'),
    marginVertical: hp('0.5'),
  },
  topSearchContainer: {
    backgroundColor: '#1F111C',
    paddingVertical: RFValue('50'),
    flex: 1,
  },
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
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: RFValue('10'),
    // paddingHorizontal: RFValue('10'),
  },
});

export default styles;
