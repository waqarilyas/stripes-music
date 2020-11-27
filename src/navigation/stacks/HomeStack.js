import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import Artist from '../../screens/Artist';
import useUser from '../../hooks/useUser';
import ForYouTabs from '../Tabs/ForYouTabs';
import ArtistNews from '../../screens/ArtistNews';
import NowPlayingTabs from '../Tabs/NowPlayingTabs';
import AlbumDetail from '../../screens/AlbumDetail';
import ArtistPopular from '../../screens/ArtistPopular';
import ArtistsSeeAll from '../../screens/ArtistsSeeAll';
import ArtistReleases from '../../screens/ArtistReleases';
import TopAlbumsSeeAll from '../../screens/TopAlbumsSeeAll';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import MostPlayedSeeAll from '../../screens/MostPlayedSeeAll';
import CreateNewPlaylist from '../../screens/CreateNewPlaylist';
import ForYouAudioSeeAll from '../../screens/ForYouAudioSeeAll';
import RecentPlayedSeeAll from '../../screens/RecentPlayedSeeAll';
import ForYouAlbumsSeeAll from '../../screens/ForYouAlbumsSeeAll';
import FavouriteArtistSeeAll from '../../screens/FavouriteArtistSeeAll';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import MusicScreenPlaylistDetails from '../../screens/MusicScreenPlaylistDetails';
import MusicScreenCreateNewPlaylist from '../../screens/MusicScreenCreateNewPlaylist';

const Stack = createStackNavigator();

const search = (navigation) => (
  <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
    <Image source={searchIcon} style={styles.icon} />
  </TouchableOpacity>
);
const back = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={backIcon} style={styles.back} />
    </TouchableOpacity>
  );
};

const placeholder =
  'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

const searchAndProfile = (navigation, profilePicture) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        containerStyle={styles.avatar}
        source={{ uri: profilePicture || placeholder }}
        onPress={() => navigation.navigate('Profile')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Image source={searchIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const HomeStack = () => {
  const user = useUser();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'Music',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => search(navigation),
          headerLeft: null,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ForYouAudioSeeAll"
        component={ForYouAudioSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => searchAndProfile(navigation, user.profilePicture),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ForYouAlbumsSeeAll"
        component={ForYouAlbumsSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => searchAndProfile(navigation, user.profilePicture),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="AlbumDetail"
        component={AlbumDetail}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => searchAndProfile(navigation, user.profilePicture),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="RecentPlayedSeeAll"
        component={RecentPlayedSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={({ navigation }) => ({
          title: '',
          headerRight: search,
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ArtistsSeeAll"
        component={ArtistsSeeAll}
        options={({ navigation }) => ({
          headerTitle: '',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen name="ArtistNews" component={ArtistNews} />
      <Stack.Screen name="ArtistPopular" component={ArtistPopular} />
      <Stack.Screen
        name="CreateNewPlaylist"
        component={CreateNewPlaylist}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen name="ArtistReleases" component={ArtistReleases} />
      <Stack.Screen
        name="MostPlayedSeeAll"
        component={MostPlayedSeeAll}
        options={({ navigation }) => ({
          headerTitle: '',
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
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerLeft: () => back(navigation),
          headerRight: () => searchAndProfile(navigation, user.profilePicture),
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
        name="TopAlbumsSeeAll"
        component={TopAlbumsSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
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
