import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  image: {
    height: 120,
    width: 200,
    overflow: 'hidden',
    borderRadius: 12,
    marginVertical: 18,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  blog: {
    color: 'white',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'auto',
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('4'),
  },
  authorView: {
    flexDirection: 'row',
    marginTop: 24,
  },
  postBy: {
    color: 'gray',
    fontWeight: 'bold',
  },
  authorName: {
    color: 'white',
    fontWeight: 'bold',
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
  commentSection: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: hp('2'),
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
  realtedNewsContainer: {
    flex: 1,
  },
  commentDivider: {
    marginVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  commentListStyle: {
    marginVertical: 32,
    marginHorizontal: 12,
  },
  showContainer: {
    margin: '2%',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    marginBottom: hp(3),
    padding: '4%',
  },
  commentMainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  showText: {
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(12),
  },
  sendButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  showRootContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default styles;
