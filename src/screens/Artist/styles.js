import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: RFValue(30),
    backgroundColor: 'black',
  },
  containerRight: {
    flexShrink: 1,
    paddingHorizontal: RFValue(10),
    flex: 1,
  },
  followerCountText: {
    color: '#928989',
    marginTop: 6,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  subtitle: {
    color: 'grey',
    fontSize: RFValue(12),
  },
  follow: {
    backgroundColor: '#F5138E',
  },
  unfollow: {
    backgroundColor: '#778899',
  },
  buttonContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 10,
    marginTop: hp(1),
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  status: {
    color: 'white',
    marginTop: hp(1),
    fontSize: RFValue(12),
    backgroundColor: '#F5138E',
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 6,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});

export default styles;
