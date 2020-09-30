import { StyleSheet } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C262B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: hp('2'),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: hp('2'),
    marginRight: hp('10'),
    marginVertical: hp('1'),
    marginLeft: hp('2'),
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4'),
  },
  time: {
    color: 'white',
  },
});

export default styles;
