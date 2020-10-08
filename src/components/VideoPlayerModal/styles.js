import { StyleSheet } from 'react-native';

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
    paddingVertical: 22,
    borderRadius: 12,
  },
  commentButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    marginTop: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  submitText: {
    color: 'white',
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
  backgroundVideo: {
    height: 300,
    marginVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
});

export default styles;
