import { StyleSheet } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  title: {
    color: 'white',
  },
  subtitle: {
    color: '#767175',
  },
  container: {
    width: '100%',
  },
  followButton: {
    backgroundColor: '#F5138E',
    height: hp('5'),
  },
});

export default styles;
