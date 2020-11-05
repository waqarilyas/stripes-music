import React, { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { downIcon, plusIcon, shareIcon } from '../../../Assets/Icons';
import FullScreenOverlay from '../../components/FullScreenOverlay';
import {
  changeToMiniModal,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import MusicPlayerRelated from '../MusicPlayerRelated';
import styles from './styles';

const MusicPlayerFullscreen = ({ isVisible }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  // const navigation = useNavigation();

  // console.log('-------navigation:----', navigation);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share Options',
        url: 'https://www.google.com',
        title: 'Share Music App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const navigation = useNavigation()

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <FullScreenOverlay visible={visible} toggleOverlay={toggleOverlay} />
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              dispatch(changeToMiniModal(true));
              dispatch(fullScreenChange(false));
            }}>
            <View style={styles.headerLeft}>
              <Image source={downIcon} style={styles.arrowIcon} />
              <Text style={styles.title}>Now Playing</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={onShare}>
              <Image source={shareIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleOverlay()}>
              <Image source={plusIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <MusicPlayerRelated />
    </Modal>
  );
};

export default MusicPlayerFullscreen;
