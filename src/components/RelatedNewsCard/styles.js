import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    padding: hp('0.8'),
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginVertical: hp('2'),
  },
  image: {
    resizeMode: 'contain',
    height: hp('12'),
    width: hp('18'),
    overflow: 'hidden',
    borderRadius: hp('5'),
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    flexShrink: 1,
    marginBottom: hp('1'),
  },
  subtitle: {
    color: '#A09C9F',
  },
  textContainer: {
    justifyContent: 'space-between',
    flex: 2,
    paddingHorizontal: hp('1'),
  },
});

export default styles;
