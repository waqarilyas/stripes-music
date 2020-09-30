import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import ForYouSeeAll from '../../screens/ForYouSeeAll';
import MostPlayedSeeAll from '../../screens/MostPlayedSeeAll';
import ArtistNews from '../../screens/ArtistNews';
import ArtistPopular from '../../screens/ArtistPopular';
import ArtistReleases from '../../screens/ArtistReleases';
import Artist from '../../screens/Artist';
import FavouriteArtistSeeAll from '../../screens/FavouriteArtistSeeAll';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import NowPlayingTabs from '../tabs/NowPlayingTabs';
import ForYouTabs from '../tabs/ForYouTabs';
import MusicScreenAllPlayLists from '../../screens/MusicScreenAllPlaylists';
import MusicScreenCreateNewPlaylist from '../../screens/MusicScreenCreateNewPlaylist';
import MusicScreenPlaylistDetails from '../../screens/MusicScreenPlaylistDetails';
import ArtistsSeeAll from '../../screens/ArtistsSeeAll';
import TabsMainHeader from '../../components/TabsMainHeader';

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route: { name } }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <TabsMainHeader navigation={navigation} name={name} />,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ForYouSeeAll" component={ForYouSeeAll} />
      <Stack.Screen name="ArtistsSeeAll" component={ArtistsSeeAll} />
      <Stack.Screen name="Artist" component={Artist} />
      <Stack.Screen name="ArtistNews" component={ArtistNews} />
      <Stack.Screen name="ArtistPopular" component={ArtistPopular} />
      <Stack.Screen name="ArtistReleases" component={ArtistReleases} />
      <Stack.Screen name="MostPlayedSeeAll" component={MostPlayedSeeAll} />
      <Stack.Screen
        name="FavouriteArtistSeeAll"
        component={FavouriteArtistSeeAll}
      />
      <Stack.Screen
        name="MusicPlayerFullscreen"
        component={MusicPlayerFullscreen}
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

export default HomeStack;
