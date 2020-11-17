import auth from '@react-native-firebase/auth';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import RNIap from 'react-native-iap';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

import Button from '../../components/Button';
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

  const itemSubs = Platform.select({
    ios: ['1Month'],
    android: [],
  });

  const subscribe = async () => {
    const result = await RNIap.initConnection();
    console.log('result', result);

    Alert.alert('RNIAP is connected: ' + result);
    // const result = await RNIap.initConnection();
    let status1 = await RNIap.clearProductsIOS();
    let status2 = await RNIap.clearTransactionIOS();
    // }
    const subscriptions = await RNIap.getSubscriptions(itemSubs);

    console.log('----SUB------', subscriptions);
    console.log(status1, '--------', status2);
    RNIap.requestSubscription('1Month')
      .then((res) => {
        console.log('----Response----', res);
      })
      .catch((err) => {
        console.log('------error----', err);
      });
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
    subscribe();
  }, [disp]);

  const [refreshing, setRefreshing] = useState(false);

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
      <ImageBackground style={styles.background} blurRadius={20}>
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
          <HomeTopAlbums navigation={navigation} />

          <Button text="Sign Out" onPress={handleSignOut} />
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

export default Home;
