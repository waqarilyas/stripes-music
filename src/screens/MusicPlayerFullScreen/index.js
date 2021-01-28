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
  Platform,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { downIcon, plusIcon, shareIcon } from '../../../Assets/Icons';
import FullScreenOverlay from '../../components/FullScreenOverlay';
import {
  changeToMiniModal,
  fullScreenChange,
} from '../../Redux/Reducers/audioSlice';
import MusicPlayerRelated from '../MusicPlayerRelated';
import styles from './styles';

const MusicPlayerFullscreen = (props) => {
  const { isVisible } = props;
  console.log('MusicPlayerFullscreen Props', props);
  const [visible, setVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const { user } = useSelector((state) => state.root.firebase);
  const { currentSong } = useSelector((state) => state.root.audio);
  const dispatch = useDispatch();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: Platform.OS === 'android' ? 'https://www.google.com' : '',
        url: 'https://apps.apple.com/us/app/stripes-app/id1538914059',
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
    if (user?.isPaidUser) {
      toggleOverlay();
    } else if (user) {
      Alert.alert(
        'Premium Account Required',
        'You must purchase Standard Subscription in order to add this song to your custom playlist',
      );
    } else {
      Alert.alert(
        'Login Required',
        'You must be logged in to add this song to your custom playlist',
      );
    }
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}>
      <FullScreenOverlay
        visible={visible}
        onBackdropPress={toggleOverlay}
        toggleOverlay={toggleOverlay}
        playlists={playlists}
        targetSong={currentSong}
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
            <TouchableOpacity onPress={addToPlaylist}>
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
