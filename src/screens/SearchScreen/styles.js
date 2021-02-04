import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingTop: RFValue('30'),
  },
  searchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3E3947',
    borderRadius: RFValue('10'),
    flex: 1,
  },
  closeButton: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: RFValue('10'),
    // paddingHorizontal: RFValue('10'),
  },
  textInput: {
    height: RFValue(35),
    margin: RFValue('5'),
    color: 'white',
  },
  searchIcon: {
    resizeMode: 'contain',
    height: RFValue('16'),
    width: RFValue('16'),
    marginHorizontal: RFValue('10'),
  },
  searchWithClose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: RFValue('10'),

  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: RFValue('10'),

  },
  buttonContainer: {
    paddingVertical: hp(6),


  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: RFValue('20'),
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue('18'),
  },
  headerIcon: {
    marginHorizontal: RFValue('10'),
    resizeMode: 'contain',
    height: RFValue('20'),
    width: RFValue('20'),
    tintColor: 'white',
  },
  item: {
    flex: 1,
  },
  recentSearchesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  recentSearchesText: {
    color: 'white',
  },
  recentIcon: {
    resizeMode: 'contain',
    height: RFValue('150'),
    width: RFValue('150'),
  },
});

export default styles;
