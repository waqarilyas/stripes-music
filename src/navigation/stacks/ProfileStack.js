import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../screens/ProfileScreen';
import ProfilePlaylistsSeeAll from '../../screens/ProfilePlaylistsSeeAll';
import ProfileArtistsSeeAll from '../../screens/ProfileArtistsSeeAll';
import ProfileRecentlyPlayedSeeAll from '../../screens/ProfileRecentlyPlayedSeeAll';
import Artist from '../../screens/Artist';
import AccountSetting from '../../screens/AccountSetting';
import ChangePassword from '../../screens/ChangePassword';
import NotificationSetting from '../../screens/NotificationSetting';
import SubscriptionStack from '../stacks/SubscriptionStack';
import TellAFriend from '../../screens/TellAFriend';
import EditProfile from '../../screens/EditProfile';
import { searchIcon, backIcon } from '../../../Assets/Icons';

const Stack = createStackNavigator();

const ProfileStack = () => {
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
        options={({ navigation }) => ({
          title: '',
          headerRight: () => search(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ProfilePlaylists"
        component={ProfilePlaylistsSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => search(navigation),
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ProfileArtists"
        component={ProfileArtistsSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => search(navigation),
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="ProfileRecentlyPlayed"
        component={ProfileRecentlyPlayedSeeAll}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => search(navigation),
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen name="Artist" component={Artist} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({ navigation }) => ({
          title: 'Change Password',
          headerTitleStyle: { color: 'white' },
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={({ navigation }) => ({
          title: 'Notification Setting',
          headerTitleStyle: { color: 'white' },
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="Subscriptions"
        component={SubscriptionStack}
        options={({ navigation }) => ({
          title: 'Edit Your Subscription',
          headerTitleStyle: { color: 'white' },
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="TellAFriend"
        component={TellAFriend}
        options={({ navigation }) => ({
          title: 'Tell A Friend',
          headerTitleStyle: { color: 'white' },
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => ({
          title: 'Edit Profile',
          headerTitleStyle: { color: 'white' },
          headerLeft: () => back(navigation),
          headerStyle: styles.headerStyle,
        })}
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

export default ProfileStack;
