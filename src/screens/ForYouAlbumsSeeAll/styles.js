import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  topView: {
    alignItems: 'center',
    flexShrink: 1,
    marginVertical: 12,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 28,
    fontSize: 14,
    lineHeight: 24,
    marginHorizontal: 20,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: 'black',
  },
  createNewPlaylist: {
    alignSelf: 'center',
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: hp('1'),
    paddingHorizontal: hp('4'),
    borderRadius: hp('1'),
    marginVertical: hp('3'),
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: '#212121',
    height: '50%',
    width: '80%',
    borderRadius: hp('2'),
    paddingHorizontal: hp('2'),
    alignItems: 'center',
  },
  overlayHeader: {
    fontSize: hp('2'),
    alignSelf: 'center',
    paddingVertical: hp('2'),
    color: 'white',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('3'),
  },
  camera: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: hp('5'),
    width: hp('5'),
  },
  imageEdit: {
    height: hp('4.4%'),
    width: hp('4.4%'),
  },
  cameraImage: {
    resizeMode: 'contain',
    height: hp('12'),
    width: hp('12'),
  },
  cameraIconContainer: {
    height: hp('12'),
    width: hp('12'),
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: hp('10'),
  },
  edit: {
    alignItems: 'flex-end',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  subtitle: {
    color: 'grey',
    textAlign: 'center',
  },
  textInput: {
    height: hp('2'),
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: hp('2'),
  },
  createButton: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: hp('2'),
    paddingVertical: hp('1'),
    paddingHorizontal: hp('4'),
    borderRadius: hp('1'),
  },
});

export default styles;
