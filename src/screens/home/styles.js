import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  refresh: {
    backgroundColor: 'black',
  },
  background: {
    height: '100%',
    paddingHorizontal: hp('1'),
  },
  bannerLoading: {
    color: 'white',
    height: hp('20'),
  },
  loading: {
    height: hp('22'),
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 14,
  },
  overlay: {
    backgroundColor: '#212121',
    height: '50%',
    width: '80%',
    borderRadius: hp('2'),
    paddingHorizontal: hp('2'),
  },
  overlayHeader: {
    fontSize: hp('2'),
    alignSelf: 'center',
    paddingVertical: hp('2'),
    color: 'white',
  },
  checkboxContainer: {
    backgroundColor: 'black',
  },
  checkboxInput: {
    fontSize: hp('2'),
    color: 'white',
    marginRight: hp('10'),
  },
});

export default styles;
