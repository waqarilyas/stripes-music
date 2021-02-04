import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { backIcon, searchIcon } from '../../../Assets/Icons';
import HeaderRightButton from '../../components/HeaderRightButton';
import { getAnAlbum, getArtist } from '../../Redux/Reducers/firebaseSlice';
import AlbumDetail from '../../screens/AlbumDetail';
import Artist from '../../screens/Artist';
import ArtistNews from '../../screens/ArtistNews';
import ArtistPopular from '../../screens/ArtistPopular';
import ArtistReleases from '../../screens/ArtistReleases';
import ArtistsSeeAll from '../../screens/ArtistsSeeAll';
import CreateNewPlaylist from '../../screens/CreateNewPlaylist';
import FavouriteArtistSeeAll from '../../screens/FavouriteArtistSeeAll';
import ForYouAlbumsSeeAll from '../../screens/ForYouAlbumsSeeAll';
import ForYouAudioSeeAll from '../../screens/ForYouAudioSeeAll';
import Home from '../../screens/Home';
import MostPlayedSeeAll from '../../screens/MostPlayedSeeAll';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import MusicScreenCreateNewPlaylist from '../../screens/MusicScreenCreateNewPlaylist';
import MusicScreenPlaylistDetails from '../../screens/MusicScreenPlaylistDetails';
import NewsDetails from '../../screens/NewsDetails';
import RecentPlayedSeeAll from '../../screens/RecentPlayedSeeAll';
import TopAlbumsSeeAll from '../../screens/TopAlbumsSeeAll';
import ForYouTabs from '../Tabs/ForYouTabs';
import NowPlayingTabs from '../Tabs/NowPlayingTabs';

const Stack = createStackNavigator();

const search = (navigation) => (
  <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
    <Image source={searchIcon} style={styles.icon} />
  </TouchableOpacity>
);

const HeaderLeft = (navigation) => {
  return (
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={() => navigation.goBack()}>
      <Image source={backIcon} style={styles.back} />
    </TouchableOpacity>
  );
};

const HeaderRight = (navigation) => (
  <HeaderRightButton navigation={navigation} />
);

const HomeStack = () => {
  const dispatch = useDispatch();

  const BackButton = ({ handleNavigation }) => (
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={handleNavigation}>
      <Image source={backIcon} style={styles.back} />
    </TouchableOpacity>
  );

  const HandleAlbumDetail = (navigation) => {
    const handleNavigation = () => {
      dispatch(getAnAlbum(null));
      navigation.goBack();
    };

    return <BackButton handleNavigation={handleNavigation} />;
  };

  const HandleArtist = (navigation) => {
    const handleNavigation = () => {
      dispatch(getArtist(null));
      navigation.goBack();
    };

    return <BackButton handleNavigation={handleNavigation} />;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'Music',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => HeaderRight(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
          headerRight: () => HeaderRight(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
          headerRight: () => HeaderRight(navigation),
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
          headerLeft: () => HandleAlbumDetail(navigation),
          headerRight: () => HeaderRight(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Artist"
        component={Artist}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => HandleArtist(navigation),
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={({ navigation }) => ({
          title: '',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => HeaderLeft(navigation),
          headerRight: () => search(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
          headerRight: () => HeaderRight(navigation),
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
          headerLeft: () => HeaderLeft(navigation),
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
  backButtonContainer: {
    paddingRight: 15,
    paddingVertical: 10,
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
