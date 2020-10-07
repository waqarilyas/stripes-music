import { StyleSheet } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: hp('2'),
  },
  count: {
    color: 'gray',
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  icon: {
    resizeMode: 'contain',
    tintColor: 'gray',
    height: 24,
    width: 24,
    marginBottom: 12,
  },
  activatedIcon: {
    resizeMode: 'contain',
    tintColor: 'white',
    height: 24,
    width: 24,
    marginBottom: 12,
  },
  activatedCount: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
