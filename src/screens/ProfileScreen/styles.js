import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  profilePictureContainer: {
    width: 125,
    height: 125,
  },
  pageTop: {
    flexDirection: 'row',
    marginHorizontal: 12,
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
    marginTop: 12,
  },
  pageTopNameView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 16,
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
    fontSize: 20,
    marginTop: 12,
  },
  followSubtext: {
    color: '#928989',
    marginTop: 6,
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
});

export default styles;
