import { StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    padding: hp('0.8'),
  },
  image: {
    resizeMode: 'contain',
    height: hp('12'),
    width: hp('18'),
    overflow: 'hidden',
    borderRadius: hp('1'),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardTop: {
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  text: {
    color: '#A09C9F',
    marginHorizontal: hp('2'),
  },
  subtitle: {
    color: '#A09C9F',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hp('2'),
    justifyContent: 'space-between',
  },
  bottomSectionNumber: {
    color: 'white',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: hp('2.5'),
  },
  readButton: {
    borderRadius: 5,
    padding: 2,
  },
  readText: {
    color: 'white',
    backgroundColor: 'rgba(38,38,38,0.5)',
    paddingVertical: 8,
    borderRadius: 5,
    paddingHorizontal: 16,
    fontSize: 12,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: hp('2'),
    marginTop: hp('2'),
    marginBottom: hp('0.5'),
  },
  icon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    marginRight: hp('1'),
  },
});

export default styles;
