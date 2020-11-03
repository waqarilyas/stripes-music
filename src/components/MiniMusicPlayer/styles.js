import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: RFValue(85),
    alignItems: 'center',
    paddingHorizontal: RFValue(6),
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
});

export default styles;
