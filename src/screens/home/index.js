import React, { useEffect, useReducer, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import reducer from '../../hooks/useReducer';
import Button from '../../components/Button';
import HomeBanner from '../../components/HomeBanner';
import HomeForYou from '../../components/HomeForYou';
import HomeMostPlayed from '../../components/HomeMostPlayed';
import HomeRecentPlayed from '../../components/HomeRecentPlayed';
import HomeBestPlaylists from '../../components/HomeBestPlaylists';
import HomeFavoriteArtists from '../../components/HomeFavoriteArtists';
import { getCollection, getOrderedCollection } from '../../utils/Firebase';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const initialState = {
  banner: [],
  songs: [],
  recentlyPlayed: [],
  artists: [],
  playlists: [],
  userPlaylists: [],
};

const Home = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [checked, setChecked] = useState(false);
  const isFullScreen = useSelector((state) => state.root.audio.isFullScreen);
  const playlist = useSelector((state) => state.root.audio.playlist);
  const [visible, setVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // const dispatch = useDispatch();
  const handleSignOut = () => {
    auth().signOut();
  };

  useEffect(() => {
    // Get Albums
    getCollection('songs', 10, (collection) =>
      dispatch({ banner: collection }),
    );

    getOrderedCollection('songs', 'playCount', 'desc', 10, (collection) =>
      dispatch({ songs: collection }),
    );
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleData();
    wait(2000).then(() => setRefreshing(false));
    // Get Playlists
    getOrderedCollection('playlists', 'viewCount', 'desc', 8, (collection) =>
      dispatch({ playlists: collection }),
    );

    // Get User Playlists
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .get()
      .then((documents) => {
        let allUserPlaylists = [];
        documents.forEach((document) => {
          if (document.exists) {
            allUserPlaylists.push(document.data());
          }
        });
        dispatch({ userPlaylists: allUserPlaylists });
      });
  }, []);

  const onAddToPlaylist = (id, song) => {
    console.log('on add to playlist called');
    const uid = auth().currentUser.uid;
    firestore()
      .collection('users')
      .doc(uid)
      .collection('playlists')
      .doc(id)
      .collection('songs')
      .doc(song.id)
      .set(song)
      .then(() => {
        console.log('added to playlist');
      });
  };

  return (
    <ScrollView
      style={{ backgroundColor: 'black', flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }>
      {/* Songs Slider Section */}
      <HomeBanner data={state.banner} />

      {/* Most Played Section */}
      <HomeMostPlayed navigation={navigation} data={state.songs} />

      {/* For You section */}
      <HomeForYou />

      {/* Recent Played Section */}
      <HomeRecentPlayed navigation={navigation} />

      {/* Favorite Artists Section */}
      <HomeFavoriteArtists navigation={navigation} />

      {/* The Best Playlists Section */}
      <HomeBestPlaylists navigation={navigation} />

      <Button text="Sign Out" onPress={handleSignOut} />
    </ScrollView>
  );
};

export default Home;
