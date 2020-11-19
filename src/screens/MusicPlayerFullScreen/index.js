import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
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
import { downIcon, plusIcon, shareIcon } from '../../../Assets/Icons';
import FullScreenOverlay from '../../components/FullScreenOverlay';
import {
  changeToMiniModal,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import MusicPlayerRelated from '../MusicPlayerRelated';
import styles from './styles';

const MusicPlayerFullscreen = ({ isVisible, navigation }) => {
  const [visible, setVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();

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

  const addToPlaylist = () => {
    console.log(uid);
  };

  useEffect(() => {
    const uid = auth().currentUser.uid;
    const listener = firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .orderBy('createdAt', 'asc')
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        setPlaylists(data);
      });

    return () => listener;
  }, []);

  console.log(navigation);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <FullScreenOverlay
        visible={visible}
        toggleOverlay={toggleOverlay}
        playlists={playlists}
        navigation={navigation}
      />
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
