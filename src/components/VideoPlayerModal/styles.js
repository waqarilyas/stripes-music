import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
const styles = StyleSheet.create({
  commentDivider: {
    marginVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  commentListStyle: {
    marginVertical: 32,
    marginHorizontal: 12,
  },
  commentButton: {
    backgroundColor: '#31282F',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 22,
    paddingBottom: 10,
    borderRadius: 12,
    marginBottom: 18,
  },
  commentButtonText: {
    color: 'white',
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: 22,
  },
  commentSection: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 12,
    marginBottom: 24,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  submit: {
    backgroundColor: '#fff',
    paddingHorizontal: hp('2.5'),
    paddingVertical: hp('2'),
    borderRadius: hp('2'),
  },
  submitText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  seek: {
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 24,
  },
  slideContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 24,
    marginTop: 8,
    marginHorizontal: 12,
    alignSelf: 'flex-start',
  },
  seeMore: {
    color: 'gray',
    marginHorizontal: 12,
    marginTop: 8,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  divider: {
    backgroundColor: 'transparent',
    marginVertical: 12,
  },
  count: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
  author: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  desc: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
    marginHorizontal: 12,
    marginTop: 24,
  },
  description: {
    color: 'white',
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginHorizontal: 12,
    marginTop: 6,
    fontSize: 14,
    lineHeight: 26,
  },
  safeArea: {
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 12,
  },
  subContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 6,
    justifyContent: 'space-between',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 16,
    width: 16,
    marginRight: 8,
    tintColor: 'gray',
    resizeMode: 'contain',
  },
  closeIcon: {
    height: 36,
    width: 36,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  closeContainer: {
    paddingVertical: 36,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  backContainer: {
    top: 10,
    padding: 20,
    left: 10,
    position: 'absolute',

    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelIcon: {
    height: 25,
    width: 25,
    tintColor: 'white',
    resizeMode: 'contain',
    position: 'absolute',
  },
  commentMainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  commentContainer: {
    backgroundColor: '#31282F',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp('2.5'),
    marginVertical: hp('2.5'),
    borderRadius: hp('2'),
    // alignSelf: 'flex-start',
    flex: 1,
  },
  commentButtonText: {
    color: 'white',
    fontSize: 18,
    width: '90%',
    // textAlign: 'center',
    paddingHorizontal: 22,
  },
  sendButtonContainer: {
    position: 'absolute',
    right: 0,
  },
});

export default styles;
