import { StyleSheet, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: RFValue(Platform.OS === 'android' ? 50 : 65),
    alignItems: 'center',
    paddingHorizontal: RFValue(6),
    backgroundColor: 'black',
  },
  songArt: {
    padding: RFValue(8),
  },
  title: {
    color: 'white',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  artist: {
    color: 'white',
    fontSize: RFValue(12),
  },
  containerRight: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: RFValue(12),
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 3,
  },
  artistContainer: {
    flexShrink: 1,
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  playerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
  },
  closeIconContainer: {
    // position: 'absolute',
    // right: 0,
    // top: 0,
  },
  close: {
    resizeMode: 'contain',
    height: hp('2'),
    width: hp('2'),
  },
});

export default styles;
