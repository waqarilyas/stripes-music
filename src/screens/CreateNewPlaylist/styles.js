import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
  },
  private: {
    color: 'white',
    alignSelf: 'center',
    fontSize: hp('2'),
    marginLeft: hp('2'),
    fontWeight: 'bold',
  },
  privacyContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: hp('2'),
  },
  backButtonContainer: {
    paddingRight: 15,
    paddingVertical: 10,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
  },
  error: {
    color: '#B22222',
    marginVertical: hp('1'),
    marginLeft: hp('1'),
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: hp('1'),
    padding: hp('2'),
    color: 'white',
    width: wp('60'),
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
    marginVertical: hp('4'),
  },
  optional: {
    color: 'gray',
    alignSelf: 'center',
    marginTop: hp('3'),
    fontSize: hp('1.6'),
    fontStyle: 'italic',
  },
  camera: {
    alignItems: 'center',
    resizeMode: 'contain',
    height: hp('20'),
    width: wp('20'),
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
});

export default styles;
