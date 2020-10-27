import auth from '@react-native-firebase/auth';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ImageBackground, RefreshControl, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Button from '../../components/Button';
import reducer from '../../hooks/useReducer';
import HomeBanner from '../../components/HomeBanner';
import HomeForYou from '../../components/HomeForYou';
import HomeMostPlayed from '../../components/HomeMostPlayed';
import HomeRecentPlayed from '../../components/HomeRecentPlayed';
import {
  getSongs,
  getMostPlayed,
  getMostPlayedSongs,
  getPlaylists,
  getAllSongs,
  getAllPlaylists,
  getAlbums,
  getAllAlbums,
  getHistory,
  getAllHistory,
  getTopArtists,
  getTopAllArtists,
  getBestPlaylists,
  getAllBestPlaylists,
} from '../../Redux/Reducers/firebaseSlice';
import HomeBestPlaylists from '../../components/HomeBestPlaylists';
import HomeFavoriteArtists from '../../components/HomeFavoriteArtists';
import HomeTopArtists from '../../components/HomeTopArtists';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const initialState = {
  banner: [],
  songs: [],
};

const Home = ({ navigation }) => {
  const disp = useDispatch();

  const [state, dispatch] = useReducer(reducer, initialState);
  const isFullScreen = useSelector((state) => state.root.audio.isFullScreen);
  const playlist = useSelector((state) => state.root.audio.playlist);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSignOut = () => {
    auth().signOut();
  };

  useEffect(() => {
    disp(getSongs());
    disp(getAllSongs());
    disp(getMostPlayed());
    disp(getMostPlayedSongs());
    disp(getAlbums());
    disp(getAllAlbums());
    disp(getAllPlaylists());
    disp(getHistory());
    disp(getAllHistory());
    disp(getTopArtists());
    disp(getTopAllArtists());
    disp(getBestPlaylists());
    disp(getAllBestPlaylists());
  }, [disp]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    disp(getSongs());
    disp(getMostPlayed());
    disp(getPlaylists());

    wait(2000).then(() => setRefreshing(false));
  }, [disp]);

  // const onAddToPlaylist = (id, song) => {
  //   console.log('on add to playlist called');
  //   const uid = auth().currentUser.uid;
  //   firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .collection('playlists')
  //     .doc(id)
  //     .collection('songs')
  //     .doc(song.id)
  //     .set(song)
  //     .then(() => {
  //       console.log('added to playlist');
  //     });
  // };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          style={{ backgroundColor: 'black' }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
          progressBackgroundColor="transparent"
        />
      }>
      <ImageBackground style={{ height: '100%' }} blurRadius={20}>
        <LinearGradient colors={['black', '#0F2027', 'black']}>
          {/* Songs Slider Section */}
          <HomeBanner />

          {/* Most Played Section */}
          <HomeMostPlayed navigation={navigation} />

          {/* For You section */}
          <HomeForYou />

          {/* Recent Played Section */}
          <HomeRecentPlayed navigation={navigation} />

          {/* Favorite Artists Section */}
          <HomeTopArtists navigation={navigation} />

          {/* Favorite Artists Section */}
          <HomeFavoriteArtists navigation={navigation} />

          {/* The Best Playlists Section */}
          <HomeBestPlaylists navigation={navigation} />

          <Button text="Sign Out" onPress={handleSignOut} />
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

export default Home;
