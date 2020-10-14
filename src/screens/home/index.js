import auth from '@react-native-firebase/auth';
import React, { useEffect, useReducer } from 'react';
import Block from '../../components/Block';
import Button from '../../components/Button';
import HomeBanner from '../../components/HomeBanner';
import HomeBestPlaylists from '../../components/HomeBestPlaylists';
import HomeFavoriteArtists from '../../components/HomeFavoriteArtists';
import HomeForYou from '../../components/HomeForYou';
import HomeMostPlayed from '../../components/HomeMostPlayed';
import HomeRecentPlayed from '../../components/HomeRecentPlayed';

const Home = ({ navigation }) => {
  const handleSignOut = () => {
    auth().signOut();
  };

  useEffect(() => {}, []);

  return (
    <Block>
      {/* Songs Slider Section */}
      <HomeBanner />

      {/* Most Played Section */}
      <HomeMostPlayed navigation={navigation} />

      {/* For You section */}
      <HomeForYou />

      {/* Recent Played Section */}
      <HomeRecentPlayed navigation={navigation} />

      {/* Favorite Artists Section */}
      <HomeFavoriteArtists navigation={navigation} />

      {/* The Best Playlists Section */}
      <HomeBestPlaylists navigation={navigation} />

      <Button text="Sign Out" onPress={handleSignOut} />
    </Block>
  );
};

export default Home;
