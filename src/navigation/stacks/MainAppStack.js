import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { backIcon, searchIcon } from '../../../Assets/Icons';
import SubscriptionModalScreen from '../../components/SubscriptionBottomSheet';
import ForgotPassword from '../../screens/ForgotPassword';
import IntroScreen from '../../screens/IntroScreen';
import Login from '../../screens/Login';
import MusicPlayerModal from '../../screens/MusicPlayerModal';
import NoInternet from '../../screens/NoInternet';
import SearchResultsScreen from '../../screens/SearchResultsSceen';
import SearchScreen from '../../screens/SearchScreen';
import Signup from '../../screens/Signup';
import MainTabs from '../Tabs/MainTabs';
import AccountSettingStack from './AccountSettingStack';

const Stack = createStackNavigator();

const MainAppStack = () => {
  const miniPlayer = useSelector((state) => state.root.audio.miniModalOpen);
  const isFullScreen = useSelector((state) => state.root.audio.isFullScreen);

  const back = (navigation) => {
    return (
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
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
      <Stack.Navigator>
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={({ navigation }) => ({
            title: 'Login',
            headerTitleStyle: { fontSize: hp('3'), fontWeight: 'bold' },
            headerTitleAlign: 'center',
            headerLeft: () => back(navigation),
            headerStyle: styles.headerStyle,
          })}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AccountSettingStack"
          component={AccountSettingStack}
          options={{ headerShown: false }}
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
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      {miniPlayer && <MusicPlayerModal screen="miniplayer" />}
      {isFullScreen && <MusicPlayerModal screen="fullscreen" />}
      <SubscriptionModalScreen />
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
  backButtonContainer: {
    paddingVertical: 10,
    paddingRight: 15,
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
