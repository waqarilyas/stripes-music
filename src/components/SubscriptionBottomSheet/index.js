import React, { useEffect, useState } from 'react';
import {
  StyleSheet
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TrackPlayer, {
  useTrackPlayerProgress
} from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { fullScreenChange } from '../../Redux/Reducers/audioSlice';
import { setIsChatNotPaid, setVidoReferences } from '../../Redux/Reducers/helperSlice';
import SubscriptionModal from '../../screens/SubscriptionModal';
import { PLAYBACK_TIME_LIMIT_AUDIO } from '../../utils/Constants';


const SubscriptionModalScreen = ({ }) => {
  const user = useSelector(state => state.root.firebase.user);
  const { isVideoPlaying, isChatPaid, currentTime } = useSelector(state => state.root.helpers)


  const progressData = useTrackPlayerProgress();
  const dist = useDispatch();
  let [state, setState] = useState({
    isVisible: true,
    stopPlaying: false
  })

  useEffect(() => {
    if (!user.isPaidUser && state.isVisible && progressData.position > PLAYBACK_TIME_LIMIT_AUDIO) {
      dist(fullScreenChange(false))
      setState(prev => ({ ...prev, stopPlaying: !state.stopPlaying }))
      TrackPlayer.pause();
    } else if (progressData.position < PLAYBACK_TIME_LIMIT_AUDIO) {
      setState(prev => ({ ...prev, isVisible: true, stopPlaying: false }))
    }
  }, [progressData.position])

  const shouldShowAudioSubPlan = isVideoPlaying ? (!user.isPaidUser) : isChatPaid ? true : (!user.isPaidUser && state.isVisible && state.stopPlaying);
  
  return (
    <Overlay
      isVisible={shouldShowAudioSubPlan}
      overlayStyle={styles.Overlay}
      animationType="slide"
      backdropStyle={{ backgroundColor: 'transparent' }}>
      <SubscriptionModal toggleModal={() => {
        dist(setVidoReferences({ isVideoPlaying: false, currentTime: 0 }))
        dist(setIsChatNotPaid(false))
        setState(prev => ({ ...prev, isVisible: false }))
      }} />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  customStyles: {},

  container: {
    backgroundColor: 'red',
    borderRadius: hp('3'),
  },
  Overlay: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: hp('3'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    // flex: 1,
  },
});

export default SubscriptionModalScreen;