import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const cardStyles = {
  flex: 1,
  marginHorizontal: RFValue(6),
  borderRadius: RFValue('6'),
  padding: RFValue('16'),
};

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    borderTopEndRadius: RFValue(24),
    borderTopLeftRadius: RFValue(24),
    backgroundColor: 'white',
    height: '80%',
    flex: 1,
  },
  divider: {
    backgroundColor: 'gray',
    marginBottom: RFValue('8'),
    height: RFValue('4'),
    alignSelf: 'center',
    width: '40%',
    borderRadius: RFValue('3'),
  },
  header: {
    color: 'black',
    alignSelf: 'center',
    fontSize: hp('2.5'),
    fontWeight: 'bold',
    marginVertical: hp('2'),
  },
  freeContainer: {
    ...cardStyles,
    marginBottom: RFValue('24'),
    backgroundColor: '#1A1A1A',
  },
  standardContainer: {
    marginBottom: RFValue('6'),
    ...cardStyles,
    backgroundColor: '#16C286',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: RFValue('8'),
  },
  title: {
    color: 'white',
    fontSize: RFValue(18),
    alignSelf: 'center',
    marginBottom: RFValue('20'),
    fontWeight: 'bold',
  },
  tick: {
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: RFValue('10'),
  },
  text: {
    color: 'white',
    fontSize: RFValue('14'),
    fontWeight: 'bold',
    paddingRight: hp('2'),
  },
});

export default styles;
