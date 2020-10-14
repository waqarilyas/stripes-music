import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import Artist from '../../screens/Artist';
import ProfileScreen from '../../screens/ProfileScreen';
import { searchIcon, backIcon } from '../../../Assets/Icons';
import CreateNewPlaylist from '../../screens/CreateNewPlaylist';
import ProfileArtistsSeeAll from '../../screens/ProfileArtistsSeeAll';
import ProfilePlaylistsSeeAll from '../../screens/ProfilePlaylistsSeeAll';
import ProfileRecentlyPlayedSeeAll from '../../screens/ProfileRecentlyPlayedSeeAll';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const search = () => <Image source={searchIcon} style={styles.icon} />;
  const back = (navigation) => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backIcon} style={styles.back} />
      </TouchableOpacity>
    );
  };

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

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Playlist"
        component={ProfileScreen}
        options={{
          title: '',
          headerRight: search,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="ProfilePlaylists"
        component={ProfilePlaylistsSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerRight: search,
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
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
      <Stack.Screen
        name="ProfileArtists"
        component={ProfileArtistsSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerRight: search,
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ProfileRecentlyPlayed"
        component={ProfileRecentlyPlayedSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerRight: search,
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen name="Artist" component={Artist} />
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

export default ProfileStack;
