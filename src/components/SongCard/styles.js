import { StyleSheet } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: hp('25'),
    width: hp('20'),
    borderTopLeftRadius: hp('3'),
    borderTopRightRadius: hp('3'),
    margin: hp('1'),
  },
  image: {
    resizeMode: 'contain',
    justifyContent: 'center',
    height: hp('16'),
    width: hp('16'),
    borderRadius: hp('3'),
    overflow: 'hidden',
  },
  cardHeader: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardSubHeader: {
    color: '#787878',
  },
  cardText: {
    marginTop: hp('2'),
  },
});

export default styles;
