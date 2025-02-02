import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import { introVideo } from '../../../Assets/Icons';
import {
  getAlbums,
  getAllAlbums,
  getAllBestAlbums,
  getAllHistory,
  getAllNews,
  getAllPlaylists,
  getAllPopularVideos,
  getAllSongs,
  getBestAlbums,
  getHistory,
  getLatestVideos,
  getMostPlayed,
  getMostPlayedSongs,
  getPlaylists,
  getPopularVideos,
  getSongs,
  getTopAllArtists,
  getTopArtists,
  getUser,
  getVideos,
} from '../../Redux/Reducers/firebaseSlice';
import styles from './styles';

const IntroScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      navigation.navigate('MainTabs');
    }, 5000);
  }, []);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getAllSongs());
    dispatch(getMostPlayed());
    dispatch(getMostPlayedSongs());
    dispatch(getAlbums());
    dispatch(getAllAlbums());
    dispatch(getAllPlaylists());
    dispatch(getHistory());
    dispatch(getAllHistory());
    dispatch(getTopArtists());
    dispatch(getTopAllArtists());
    dispatch(getBestAlbums());
    dispatch(getAllBestAlbums());
    dispatch(getVideos());
    dispatch(getPopularVideos());
    dispatch(getLatestVideos());
    dispatch(getAllPopularVideos());
    dispatch(getAllNews());
    dispatch(getUser());
    dispatch(getPlaylists());
  }, []);

  const handleSkip = () => navigation.navigate('MainTabs');

  return (
    <View style={styles.container}>
      {show ? (
        <Video
          source={introVideo}
          style={styles.backgroundVideo}
          resizeMode={'cover'}
        />
      ) : null}
    </View>
  );
};

export default IntroScreen;
