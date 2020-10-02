import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    padding: hp('0.8'),
    marginVertical: hp('2'),
  },

  text: {
    color: '#A09C9F',
    marginBottom: hp('2'),
  },
  subtitle: {
    color: '#A09C9F',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;
