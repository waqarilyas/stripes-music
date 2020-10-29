import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  spacing: {
    marginTop: hp('4'),
  },
  newVideosContainer: {
    flex: 1,
  },
  divider: {
    backgroundColor: 'transparent',
    marginVertical: 8,
  },
});

export default styles;
