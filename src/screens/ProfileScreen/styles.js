import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  pageTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  artistName: {
    color: 'white',
    fontSize: hp('3'),
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#928989',
    fontSize: hp('2'),
  },
  subtitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: '',
  },
  pageTopNameView: {
    justifyContent: 'space-around',
  },
  locationIcon: {
    resizeMode: 'contain',
    height: hp('3'),
    width: hp('3'),
    marginRight: hp('2'),
  },
  followersView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp('3'),
  },
  followers: {
    justifyContent: 'center',
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2.5'),
  },
  followSubtext: {
    color: 'white',
    color: '#928989',
  },
  followButtonText: {
    color: 'white',
  },
  followButton: {
    backgroundColor: '#403336',
    paddingHorizontal: hp('5'),
    // paddingVertical: hp('1'),
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
