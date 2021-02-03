import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const icon = {
  height: 20,
  width: 20,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

  },
  backgroundVideo: {
    height: 300,
    marginVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    // marginTop: heightPercentageToDP(5.3)
  },
  loadBackgroundVideo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seek: {
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 24,
  },
  slideContainer: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 62,
    width: '85%',
    alignSelf: 'center',
  },
  resumeContainer: {
    position: 'absolute',
    alignContent: 'center',
    alignSelf: 'center',
    top: '40%',
    bottom: '40%',
    justifyContent: 'center',

  },
  resumeIcon: {
    resizeMode: 'contain',
    width: 70,
    alignSelf: 'center',
    height: 70,
  },
  thumb: {
    height: 12,
    width: 12,
  },
  time: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeContainer: {
    position: 'absolute',
    top: 20,
    padding: 20,
    left: 10,
    position: 'absolute',
    backgroundColor: 'black',


  },
  fullScreenContainer: {
    position: 'absolute',
    top: 30,
    padding: 10,
    right: 16,
  },
  fullScreenIcon: {
    ...icon,
  },
  muteContainer: {
    position: 'absolute',
    top: 30,
    padding: 10,
    right: 64,
  },
  muteIconActivated: {
    ...icon,
    tintColor: '#E81093',
  },
  muteIcon: {
    ...icon,
    tintColor: 'white',
  },
  closeIcon: {
    ...icon,
    position: 'absolute',
    zIndex: 1
  },
});

export default styles;
