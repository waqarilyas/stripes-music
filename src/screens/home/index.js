import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ImageBackground, RefreshControl, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import HomeBanner from '../../components/HomeBanner';
import HomeFavoriteArtists from '../../components/HomeFavoriteArtists';
import HomeForYou from '../../components/HomeForYou';
import HomeMostPlayed from '../../components/HomeMostPlayed';
import HomeRecentPlayed from '../../components/HomeRecentPlayed';
import HomeTopAlbums from '../../components/HomeTopAlbums';
import HomeTopArtists from '../../components/HomeTopArtists';
import reducer from '../../hooks/useReducer';
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

const initialState = {
  banner: [],
  songs: [],
};

const Home = ({ navigation }) => {
  const disp = useDispatch();
  global.nav = navigation;
  const [state, dispatch] = useReducer(reducer, initialState);
  const isFullScreen = useSelector((state) => state.root.audio.isFullScreen);
  const playlist = useSelector((state) => state.root.audio.playlist);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  // const subsModal = useSelector(
  //   (state) => state.root.helpers.subscriptionModal,
  // );

  // subsModal && navigation.navigate('SubscriptionModalScreen');

  const checkInternet = async () => {
    const connected = await NetInfo.fetch();
    !connected.isConnected && navigation.navigate('NoInternet');
  };
  // checkInternet();

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
    disp(getBestAlbums());
    disp(getAllBestAlbums());
    disp(getVideos());
    disp(getPopularVideos());
    disp(getLatestVideos());
    disp(getAllPopularVideos());
    disp(getAllNews());
    disp(getUser());
    disp(getPlaylists());
  }, [disp]);

  const [refreshing, setRefreshing] = useState(false);
  const [bgImg, setBgImg] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    disp(getSongs());
    disp(getMostPlayed());
    disp(getPlaylists());

    wait(2000).then(() => setRefreshing(false));
  }, [disp]);



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
      <ImageBackground source={bgImg ? { uri: bgImg } : null} style={[styles.background,{paddingHorizontal:0, margin:0}]} blurRadius={20}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']} style={{paddingHorizontal:RFPercentage(1)}}>
          {/* Songs Slider Section */}

          <HomeBanner currentItemImage={(img) => {
            setBgImg(img)
          }} />

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
