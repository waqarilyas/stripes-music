import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000',
    flex: 1,
    marginBottom: RFValue(Platform.OS === 'android' ? 50 : 65),
  },
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(20),
    alignItems: 'center',
    // marginTop: 50,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(22),
  },
  icon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    marginHorizontal: RFValue(10),
    tintColor: 'white',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    resizeMode: 'contain',
    height: RFValue(15),
    width: RFValue(15),
    marginHorizontal: RFValue(10),
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: RFValue(80),
    alignItems: 'center',
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
    marginTop: RFValue(20),
  },
  fullscreenIcon: {
    resizeMode: 'contain',
    height: RFValue(30),
    width: RFValue(30),
    tintColor: 'white',
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
    marginVertical: RFValue(20),
  },
  upNext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
    marginHorizontal: RFValue(12),
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
    alignSelf: 'center',
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
    tintColor: 'white',
  },
  playlistOpenHeartIcon: {
    resizeMode: 'contain',
    height: RFValue(20),
    width: RFValue(20),
    tintColor: 'grey',
  },
  playlistOpenControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loading: {
    backgroundColor: 'white',
    height: RFValue(60),
    width: RFValue(60),
    marginHorizontal: RFValue(30),
    borderRadius: 100,
    justifyContent: 'center',
  },
});

export default styles;
