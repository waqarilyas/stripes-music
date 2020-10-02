import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hp('1'),
  },
  image: {
    height: hp('12'),
    width: hp('20'),
    overflow: 'hidden',
    borderRadius: hp('1'),
    marginVertical: hp('3'),
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    color: '#8D888C',
    fontSize: hp('1.5'),
  },
  blog: {
    color: '#F8F7F8',
    fontSize: hp('1.9'),
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('4'),
  },
  authorView: {
    flexDirection: 'row',
    marginVertical: hp('2'),
  },
  postBy: {
    color: '#8D888C',
  },
  authorName: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentButton: {
    backgroundColor: '#31282F',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('3'),
    marginVertical: hp('3'),
    borderRadius: hp('3'),
  },
  commentButtonText: {
    color: '#6F696D',
    fontWeight: 'bold',
    fontSize: hp('2.5'),
  },
  commentSection: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: hp('4'),
  },
});

export default styles;
