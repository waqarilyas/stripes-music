import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

import Video from '../../screens/Video';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import NewVideos from '../../screens/NewVideos';
import VideoPopularNow from '../../screens/VideoPopularNow';

const Stack = createStackNavigator();

const VideoStack = () => {
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
        name="Videos"
        component={Video}
        options={{
          title: 'Videos',
          headerTitleAlign: 'left',
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: search,
          headerStyle: styles.headerStyle,
        }}
      />
      <Stack.Screen
        name="VideoPopularNow"
        component={VideoPopularNow}
        options={({ navigation }) => ({
          title: 'Popular Now',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => back(navigation),
          headerRight: search,
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen name="NewVideos" component={NewVideos} />
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

export default VideoStack;
