import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import MainTabs from '../Tabs/MainTabs';
import AccountSettingStack from './AccountSettingStack';
import MusicPlayerFullscreen from '../../screens/MusicPlayerFullScreen';
import MusicPlayerModal from '../../screens/MusicPlayerModal';
import SubscriptionModal from '../../screens/SubscriptionModal';
import SearchScreen from '../../screens/SearchScreen';
import NoInternet from '../../screens/NoInternet';
import SearchResultsScreen from '../../screens/SearchResultsSceen';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import SubscriptionModalScreen from '../../components/SubscriptionBottomSheet';
import Subscriptions from '../../screens/Subscriptions';

const Stack = createStackNavigator();

const MainAppStack = ({ navigation }) => {
  const currentState = useSelector((state) => state.root.audio.miniModalOpen);
  const isFullScreen = useSelector((state) => state.root.audio.isFullScreen);
  const subsModal = useSelector(
    (state) => state.root.helpers.subscriptionModal,
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
    <>
      <SubscriptionModalScreen />

      <Stack.Navigator headerMode="none">
   
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />

        <Stack.Screen
          name="AccountSettingStack"
          component={AccountSettingStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NoInternet"
          component={NoInternet}
          options={({ navigation }) => ({
            title: ' ',
            headerLeft: () => back(navigation),
            headerRight: searchAndProfile,
            headerStyle: styles.headerStyle,
          })}
        />
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreen}
          options={({ navigation }) => ({
            title: ' ',
            headerLeft: () => back(navigation),
            headerStyle: styles.headerStyle,
          })}
        />
      </Stack.Navigator>

      {currentState ? <MusicPlayerModal /> : null}
      {isFullScreen ? <MusicPlayerFullscreen /> : null}
    </>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'center',
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
  icon: {
    resizeMode: 'contain',
    marginRight: 18,
  },
});

export default MainAppStack;
