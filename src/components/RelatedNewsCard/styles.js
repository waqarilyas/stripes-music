import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  textContainer: {
    backgroundColor: 'black',
    paddingHorizontal: 14,
    flexShrink: 1,
  },
  image: {
    overflow: 'hidden',
    borderRadius: 10,
    height: 75,
    width: 120,
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 22,
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
