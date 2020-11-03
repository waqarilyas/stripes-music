import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  profilePictureContainer: {
    width: hp('15'),
    height: hp('15'),
  },
  profilePicOverlayContainer: {
    borderRadius: hp('10'),
  },
  pageTop: {
    flexDirection: 'row',
    marginHorizontal: 12,
  },
  artistName: {
    color: 'white',
    fontSize: hp('2.5'),
    fontWeight: '600',
  },
  subtitle: {
    color: '#928989',
    fontSize: hp('2'),
  },
  placeholder: {
    width: hp('15'),
    height: hp('15'),
  },
  subtitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  pageTopNameView: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    flexShrink: 1,
  },
  locationIcon: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    marginRight: 6,
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2'),
    marginTop: 12,
    alignSelf: 'center',
  },
  followSubtext: {
    color: '#928989',
    marginTop: 6,
    alignSelf: 'center',
    fontSize: 12,
  },
  followButtonText: {
    color: 'white',
  },
  followButton: {
    backgroundColor: '#403336',
    paddingHorizontal: hp('5'),
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: 'transparent',
    marginHorizontal: 8,
  },
  editProfile: {
    color: 'black',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('1'),
    paddingHorizontal: hp('4'),
    marginVertical: hp('3'),
    fontWeight: 'bold',
    borderRadius: hp('1'),
  },
});

export default styles;
