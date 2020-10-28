import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: hp('2'),
    alignItems: 'center',
  },
  overlayHeader: {
    fontSize: hp('3'),
    alignSelf: 'center',
    paddingVertical: hp('2'),
    color: 'white',
    fontWeight: 'bold',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('6'),
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
    height: hp('15'),
    width: hp('15'),
  },
  cameraIconContainer: {
    height: hp('15'),
    width: hp('15'),
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
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: hp('2'),
  },
  createButton: {
    backgroundColor: 'white',
    paddingVertical: hp('1.5'),
    paddingHorizontal: hp('10'),
    borderRadius: hp('1'),
    marginTop: hp('25'),
  },
});

export default styles;
