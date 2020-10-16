import { StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: RFValue(80),
    alignItems: 'center',
    paddingTop: RFValue(5),
  },
  cover: {
    // color: 'grey',
  },
  title: {
    marginTop: 10,
    color: 'white',
  },
  artist: {
    fontWeight: 'bold',
    color: 'white',
  },
  containerRight: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 2,
    alignItems: 'stretch',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 3,
  },
  artistContainer: {
    flexShrink: 1,
    flex: 2,
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

  fullscreenControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // justifyContent: 'space-around',
    marginTop: RFValue(20),
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
  },
  fullscreenIcon: {
    resizeMode: 'contain',
    height: RFValue(30),
    width: RFValue(30),
  },
  heartIcon: {
    resizeMode: 'contain',
    height: RFValue(30),
    width: RFValue(30),
    tintColor: 'grey',
  },
  fullscreenContainer: {
    marginTop: RFValue(30),
    width: '100%',
  },

  fullscreenMiddleIcon: {
    resizeMode: 'contain',
    height: RFValue(60),
    width: RFValue(60),
    marginHorizontal: RFValue(32),
  },
  playlistsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: RFValue(20),
    marginVertical: RFValue(20),
  },
  upNext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  swapIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
  shuffleIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    marginRight: RFValue(10),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  randomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1C',
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(7),
    borderRadius: RFValue(10),
  },
  randomButtonText: {
    color: 'white',
    fontSize: RFValue(15),
  },
  FullTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(22),
    textAlign: 'center',
    flexShrink: 1,
    justifyContent: 'space-between',
  },
  FullSubtitle: {
    color: 'grey',
  },
  FullScreenTitleContainer: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(24),
    textAlign: 'center',
    paddingHorizontal: RFValue(70),
    alignItems: 'center',
    marginVertical: RFValue(50),
  },
  imageBackground: {
    overflow: 'hidden',
    borderRadius: RFValue(20),
    height: RFValue(200),
    width: RFValue(200),
    marginHorizontal: RFValue(20),
  },
  corousalContainer: {
    height: RFValue(200),
    marginHorizontal: RFValue(50),
  },
  sliderIcon: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: RFValue(60),
    width: RFValue(60),
  },

  // styling when playlist open

  playlistOpenStyleForImage: {
    overflow: 'hidden',
    borderRadius: RFValue(20),
    height: RFValue(100),
    width: RFValue(100),
    alignSelf: 'center',
  },

  playlistOpenIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
  },
  playlistOpenMiddleIcon: {
    resizeMode: 'contain',
    height: RFValue(40),
    width: RFValue(40),
    marginHorizontal: RFValue(30),
  },
  playlistOpenTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(20),
    textAlign: 'center',
    paddingHorizontal: RFValue(70),
  },
  playlistOpenTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: RFValue(40),
  },
  errorMsg: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
    textAlign: 'center',
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImg: {
    margin: RFValue(20),
    resizeMode: 'contain',
    height: RFValue(100),
    width: RFValue(100),
  },
  playlistOpenIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: RFValue(10),
  },
  playlistOpenIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
  },
  playlistOpenHeartIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    tintColor: 'grey',
  },
});

export default styles;
