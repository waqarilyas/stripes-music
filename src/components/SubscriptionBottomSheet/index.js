import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Overlay } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TrackPlayer, { useTrackPlayerProgress } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { fullScreenChange } from '../../Redux/Reducers/audioSlice';
import {
  displaySubscriptionScreen,
  displayVideoModal,
  setIsChatNotPaid,
  setVidoReferences,
} from '../../Redux/Reducers/helperSlice';
import SubscriptionModal from '../../screens/SubscriptionModal';
import {
  PLAYBACK_TIME_LIMIT_AUDIO,
  PLAYBACK_TIME_LIMIT_VIDEO,
} from '../../utils/Constants';

const SubscriptionModalScreen = ({}) => {
  const { user } = useSelector((state) => state.root.firebase);
  const { subscriptionModal, isVideoPlaying, currentTime } = useSelector(
    (state) => state.root.helpers,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const progressData = useTrackPlayerProgress();
  const dist = useDispatch();

  const stateUpdate = () => {
    if (!user) {
      setTimeout(() => {
        Alert.alert(
          'Login Required',
          'Please Login and Subscribe to Standard Plan in order to listen/watch full Songs!',
        );
      }, 1000);
    } else {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    if (
      !user?.isPaidUser &&
      progressData.position > PLAYBACK_TIME_LIMIT_AUDIO
    ) {
      dist(fullScreenChange(false));
      TrackPlayer.reset();
      stateUpdate();
    }
  }, [progressData.position]);

  useEffect(() => {
    if (subscriptionModal) {
      stateUpdate();
    }
  }, [subscriptionModal]);

  if (isVideoPlaying) {
    if (currentTime > PLAYBACK_TIME_LIMIT_VIDEO) {
      dist(displayVideoModal(false));
      dist(
        setVidoReferences({
          isVideoPlaying: false,
          currentTime: 0,
        }),
      );
      stateUpdate();
    }
  }
  return (
    <Overlay
      isVisible={modalVisible}
      overlayStyle={styles.Overlay}
      animationType="slide"
      backdropStyle={{ backgroundColor: 'transparent' }}>
      <SubscriptionModal
        toggleModal={() => {
          dist(setVidoReferences({ isVideoPlaying: false, currentTime: 0 }));
          dist(setIsChatNotPaid(false));
          setModalVisible(false);
          dist(displaySubscriptionScreen(false));
        }}
      />
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
