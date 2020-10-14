import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import ForYouAudioSeeAll from '../../screens/ForYouAudioSeeAll';
import ForYouPlaylistSeeAll from '../../screens/ForYouPlaylistSeeAll';
import MostPlayedSeeAll from '../../screens/MostPlayedSeeAll';
import ArtistNews from '../../screens/ArtistNews';
import ArtistPopular from '../../screens/ArtistPopular';
import ArtistReleases from '../../screens/ArtistReleases';
import Artist from '../../screens/Artist';
import FavouriteArtistSeeAll from '../../screens/FavouriteArtistSeeAll';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import NowPlayingTabs from '../Tabs/NowPlayingTabs';
import ForYouTabs from '../Tabs/ForYouTabs';
import MusicScreenAllPlayLists from '../../screens/MusicScreenAllPlaylists';
import MusicScreenCreateNewPlaylist from '../../screens/MusicScreenCreateNewPlaylist';
import MusicScreenPlaylistDetails from '../../screens/MusicScreenPlaylistDetails';
import ArtistsSeeAll from '../../screens/ArtistsSeeAll';
import { backIcon, searchIcon } from '../../../Assets/Icons';

const Stack = createStackNavigator();

const search = () => <Image source={searchIcon} style={styles.icon} />;
const back = (navigation) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={backIcon} style={styles.back} />
  </TouchableOpacity>
);

const searchAndProfile = () => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        containerStyle={styles.avatar}
        source={require('../../../Assets/Images/songCover5.jpg')}
      />
      <Image source={searchIcon} style={styles.icon} />
    </View>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Browse',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: search,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="ForYouAudioSeeAll"
        component={ForYouAudioSeeAll}
        options={({ navigation }) => ({
          title: 'For You',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: searchAndProfile,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ForYouPlaylistSeeAll"
        component={ForYouPlaylistSeeAll}
        options={({ navigation }) => ({
          title: 'For You',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: searchAndProfile,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen name="ArtistsSeeAll" component={ArtistsSeeAll} />
      <Stack.Screen name="Artist" component={Artist} />
      <Stack.Screen name="ArtistNews" component={ArtistNews} />
      <Stack.Screen name="ArtistPopular" component={ArtistPopular} />
      <Stack.Screen name="ArtistReleases" component={ArtistReleases} />
      <Stack.Screen
        name="MostPlayedSeeAll"
        component={MostPlayedSeeAll}
        options={({ navigation }) => ({
          headerTitle: 'Most Player',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="FavouriteArtistSeeAll"
        component={FavouriteArtistSeeAll}
        options={({ navigation }) => ({
          title: 'Favourite Artists',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: searchAndProfile,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="MusicPlayerFullscreen"
        component={MusicPlayerFullscreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="NowPlayingTabs" component={NowPlayingTabs} />
      <Stack.Screen name="ForYouTabs" component={ForYouTabs} />
      <Stack.Screen
        name="MusicScreenAllPlayLists"
        component={MusicScreenAllPlayLists}
      />
      <Stack.Screen
        name="MusicScreenCreateNewPlaylist"
        component={MusicScreenCreateNewPlaylist}
      />
      <Stack.Screen
        name="MusicScreenPlaylistDetails"
        component={MusicScreenPlaylistDetails}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
  },
  back: {
    resizeMode: 'contain',
    marginLeft: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerStyle: {
    backgroundColor: 'black',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default HomeStack;
