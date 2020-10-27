import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  heading: {
    color: 'white',
    paddingHorizontal: hp('2'),
    paddingVertical: hp('3'),
    fontSize: hp('3'),
    fontWeight: 'bold',
    letterSpacing: 3,
    alignSelf: 'center',
  },
  list: {
    flex: 1,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 14,
  },
  viewContainer: {
    flexDirection: 'row',
    marginTop: hp('1'),
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: hp('4'),
    paddingTop: hp('4'),
  },
  image: {
    height: hp('40'),
    resizeMode: 'contain',
  },
  title: {
    fontSize: hp('3'),
    color: 'white',
    fontWeight: 'bold',
    marginTop: hp('2'),
  },
  subtitle: {
    fontSize: hp('1.6'),
    color: 'white',
    marginTop: hp('1'),
  },
  viewCount: {
    fontSize: hp('1.5'),
    color: 'white',
    marginLeft: hp('1'),
  },
  playIcon: {
    height: hp('8'),
    width: hp('8'),
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: hp('4'),
    marginBottom: hp('4'),
  },
  eyeIcon: {
    height: hp('2'),
    width: hp('2'),
    resizeMode: 'contain',
  },
  privacyContainer: {
    paddingHorizontal: hp('1.5'),
    paddingVertical: hp('1'),
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignSelf: 'flex-start',
    borderRadius: hp('1'),
  },
  privacy: {
    fontSize: hp('1.2'),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
