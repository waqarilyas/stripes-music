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
import { Image, TouchableOpacity } from 'react-native';
import { backIcon } from '../../../Assets/Icons';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          header: () => <TabsMainHeader navigation={navigation} name="Home" />,
        })}
      />
      <Stack.Screen name="ForYouSeeAll" component={ForYouSeeAll} />
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
          headerTitleStyle: {
            color: 'white',
          },
          headerTitleAlign: 'left',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            marginLeft: 18,
          },
          headerStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 0,
            elevation: 0,
            height: 80,
            shadowOpacity: 0,
          },
          cardShadowEnabled: false,
        })}
      />
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
