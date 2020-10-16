import auth from '@react-native-firebase/auth';
import React, { useCallback, useState, useReducer, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import Button from '../../components/Button';
import HomeBanner from '../../components/HomeBanner';
import HomeBestPlaylists from '../../components/HomeBestPlaylists';
import HomeFavoriteArtists from '../../components/HomeFavoriteArtists';
import HomeForYou from '../../components/HomeForYou';
import HomeMostPlayed from '../../components/HomeMostPlayed';
import HomeRecentPlayed from '../../components/HomeRecentPlayed';
import reducer from '../../hooks/useReducer';
import { getCollection, getOrderedCollection } from '../../utils/Firebase';

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleData = () => {
    getCollection('songs', 10, (collection) =>
      dispatch({ banner: collection }),
    );

    getOrderedCollection('songs', 'playCount', 'desc', 10, (collection) =>
      dispatch({ songs: collection }),
    );
  };

  useEffect(() => {
    handleData();
  }, []);

  const handleSignOut = () => {
    auth().signOut();
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    handleData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
