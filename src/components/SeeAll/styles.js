import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  seeAllContainer: {
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    height: hp('15'),
    width: hp('15'),
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 16,
  },
});

export default styles;
