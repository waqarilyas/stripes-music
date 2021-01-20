import { StyleSheet } from 'react-native';
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
  commentButton: {
    backgroundColor: '#31282F',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    marginVertical: 22,
    borderRadius: 12,
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
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  submit: {
    backgroundColor: '#F5148E',
    marginTop: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  submitText: {
    color: 'white',
    fontSize: 16
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
});

export default styles;
