import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: hp('22'),
    width: hp('15'),
    marginHorizontal: hp('1'),
    marginTop: hp('1'),
  },
  image: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: hp('15'),
    width: hp('15'),
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  cardHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardSubHeader: {
    color: '#787878',
    marginTop: hp('0.5'),
    fontSize: 12,
  },
  cardText: {
    marginTop: hp('2'),
  },
});

export default styles;
