import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import useUser from '../../hooks/useUser';
import { setIsChatNotPaid } from '../../Redux/Reducers/helperSlice';
import AccountSetting from '../../screens/AccountSetting';
import Artist from '../../screens/Artist';
import ChangePassword from '../../screens/ChangePassword';
import CreateNewPlaylist from '../../screens/CreateNewPlaylist';
import EditProfile from '../../screens/EditProfile';
import NotificationSetting from '../../screens/NotificationSetting';
import ProfileArtistsSeeAll from '../../screens/ProfileArtistsSeeAll';
import ProfilePlaylistsSeeAll from '../../screens/ProfilePlaylistsSeeAll';
import ProfileRecentlyPlayedSeeAll from '../../screens/ProfileRecentlyPlayedSeeAll';
import ProfileScreen from '../../screens/ProfileScreen';
import TellAFriend from '../../screens/TellAFriend';
import SubscriptionStack from '../stacks/SubscriptionStack';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const dist = useDispatch();
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

  const searchAndProfile = (navigation, user) => {
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
  let user = useSelector(state => state.root.firebase.user);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Playlist"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => searchAndProfile(navigation, user),
          headerLeft: '',
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
