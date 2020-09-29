import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  bannerLoading: {
    color: 'white',
    height: hp('20'),
  },
  loading: {
    height: hp('22'),
  },
});

export default styles;
