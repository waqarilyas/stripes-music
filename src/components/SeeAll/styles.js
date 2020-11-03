import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  seeAllContainer: {
    height: hp('15'),
    width: hp('15'),
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    width: hp('4'),
    height: hp('4'),
    marginBottom: 16,
  },
});

export default styles;
