import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const cardStyles = {
  marginHorizontal: wp(2),
  borderRadius: 6,
  padding: '2%',
};

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    marginHorizontal: wp(3),
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    height: '100%',
  },
  header: {
    color: 'white',
    alignSelf: 'center',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginVertical: hp(2),
  },
  freeContainer: {
    ...cardStyles,
    flex: 1,
  },
  standardContainer: {
    ...cardStyles,
    backgroundColor: '#16C286',
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '2%',
  },
  title: {
    color: 'white',
    fontSize: RFValue(14),
    alignSelf: 'center',
    marginVertical: hp(2),
    fontWeight: 'bold',
  },
  tick: {
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: wp(3),
  },
  text: {
    color: 'white',
    fontSize: RFValue(12),
    fontWeight: 'bold',
    paddingRight: hp('2'),
  },
  cancelButtonContainer: {
    width: wp('8'),
    height: wp('8'),
    borderRadius: wp('4'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    right: -10,
    top: -10,
  },
  cancel: {
    resizeMode: 'contain',
    height: wp('5'),
    width: wp('5'),
    marginHorizontal: hp(1),
  },
});

export default styles;
