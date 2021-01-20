import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { backIcon, searchIcon } from '../../../Assets/Icons';
import HeaderRightButton from '../../components/HeaderRightButton';
import NewVideos from '../../screens/NewVideos';
import Video from '../../screens/Video';
import VideoPopularNow from '../../screens/VideoPopularNow';

const Stack = createStackNavigator();

const VideoStack = () => {
  const dist = useDispatch();
  const search = (navigation) => (
    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
      <Image source={searchIcon} style={styles.icon} />
    </TouchableOpacity>
  );
  const back = (navigation) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 15, paddingRight: 25 }}>
        <Image source={backIcon} style={styles.back} />
      </TouchableOpacity>
    );
  };

  const searchAndProfile = (navigation) => (
    <HeaderRightButton navigation={navigation} />
  );
  let user = useSelector((state) => state.root.firebase.user);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Videos"
        component={Video}
        options={({ navigation }) => ({
          title: 'Videos',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => searchAndProfile(navigation, user),
          headerLeft: '',
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="VideoPopularNow"
        component={VideoPopularNow}
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
        name="NewVideos"
        component={NewVideos}
        options={({ navigation }) => ({
          title: 'New Videos',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: () => search(navigation),
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

export default VideoStack;
