import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const cardStyles = {
  flex: 0.5,
  margin: RFValue(10),
  borderRadius: RFValue('10'),
  paddingHorizontal: RFValue('16'),
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  freeContainer: {
    ...cardStyles,
    backgroundColor: '#1A1A1A',
  },
  standardContainer: {
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
    fontWeight: 'bold',
    fontSize: RFValue(18),
    alignSelf: 'center',
    marginVertical: RFValue('20'),
  },
  tick: {
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: RFValue('10'),
  },
  text: {
    color: 'white',
    fontSize: RFValue('14'),
    // lineHeight: RFValue('20'),
  },
});

export default styles;
