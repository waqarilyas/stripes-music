import { StyleSheet } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5138E',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: hp('2'),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: hp('3'),
    marginRight: hp('2'),
    marginLeft: hp('10'),
    marginVertical: hp('1'),
    alignSelf: 'flex-end',
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4'),
  },
});

export default styles;
