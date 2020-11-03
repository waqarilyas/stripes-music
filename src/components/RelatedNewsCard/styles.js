import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textContainer: {
    backgroundColor: 'black',
    paddingHorizontal: hp('1.5'),
    flexShrink: 1,
  },
  image: {
    overflow: 'hidden',
    borderRadius: hp('1'),
    height: '100%',
    width: hp('16'),
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 18,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: hp('1'),
  },
  subtitle: {
    color: 'gray',
    fontSize: 12,
    lineHeight: 20,
  },
});

export default styles;
