import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import useUser from '../../hooks/useUser';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';
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
const back = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={backIcon} style={styles.back} />
    </TouchableOpacity>
  );
};

const placeholder = '';

const searchAndProfile = (navigation, user) => {
  const dist = useDispatch();
  return (
    <View style={styles.container}>
      {user?.isPaidUser ?
        <Avatar
          rounded
          containerStyle={styles.avatar}
          source={user.profilePicture ? { uri: user.profilePicture } : placeholder}
          onPress={() => navigation.navigate('Profile')}
        />
        :
        user?.isAnonymous ?
          <TouchableOpacity onPress={() => {
            navigation.navigate("AuthStack");
          }}>
            <View style={{ borderRadius: 50, height: RFPercentage(4), paddingHorizontal: RFPercentage(1), marginHorizontal: RFPercentage(2), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5138E' }}>
              <Text style={{ fontSize: RFPercentage(2), color: 'white' }}>Login</Text>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => {
            dist(setIsChatNotPaid(true))
          }}>
            <View style={{ borderRadius: 50, height: RFPercentage(4), width: RFPercentage(4), marginHorizontal: RFPercentage(2), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5138E' }}>
              <Text style={{ fontSize: RFPercentage(2), color: 'white' }}>.99</Text>
            </View>
          </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
        <Image source={searchIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const HomeStack = () => {
  let user = useSelector(state => state.root.firebase.user);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'Music',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => searchAndProfile(navigation, user),
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
          headerRight: () => searchAndProfile(navigation, user),
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
          headerRight: () => searchAndProfile(navigation, user),
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
          headerRight: () => searchAndProfile(navigation, user),
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
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
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
          headerRight: () => searchAndProfile(navigation, user),
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
