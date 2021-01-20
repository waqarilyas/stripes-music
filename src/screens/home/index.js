import NetInfo from '@react-native-community/netinfo';
import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, RefreshControl, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import HomeBanner from '../../components/HomeBanner';
import HomeFavoriteArtists from '../../components/HomeFavoriteArtists';
import HomeForYou from '../../components/HomeForYou';
import HomeMostPlayed from '../../components/HomeMostPlayed';
import HomeRecentPlayed from '../../components/HomeRecentPlayed';
import HomeTopAlbums from '../../components/HomeTopAlbums';
import HomeTopArtists from '../../components/HomeTopArtists';
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

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const colors = [
  'transparent',
  'black',
  'black',
  'black',
  'black',
  'black',
  'black',
  'black',
  'black',
  'black',
  'black',
  'black',
];

const Home = ({ navigation }) => {
  global.nav = navigation;
  const dispatch = useDispatch();

  const checkInternet = async () => {
    const connected = await NetInfo.fetch();
    !connected.isConnected && navigation.navigate('NoInternet');
  };

  checkInternet();

  const [refreshing, setRefreshing] = useState(false);
  const [bgImg, setBgImg] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);

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
    // dispatch(getVideos());
    // dispatch(getPopularVideos());
    // dispatch(getLatestVideos());
    // dispatch(getAllPopularVideos());
    // dispatch(getAllNews());
    dispatch(getUser());
    // dispatch(getPlaylists());

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          style={styles.refresh}
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
          progressBackgroundColor="transparent"
        />
      }>
      <ImageBackground
        source={bgImg ? { uri: bgImg } : null}
        style={[styles.background, { paddingHorizontal: 0, margin: 0 }]}
        blurRadius={20}>
        <LinearGradient
          colors={colors}
          style={{ paddingHorizontal: RFPercentage(1) }}>
          {/* Songs Slider Section */}
          <HomeBanner currentItemImage={(img) => setBgImg(img)} />

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
          <HomeTopAlbums navigation={navigation} />
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

export default Home;
