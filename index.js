/**
 * @format
 */

import App from './App';
import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import { GoogleSignin } from '@react-native-community/google-signin';
import TrackPlayer from 'react-native-track-player';
LogBox.ignoreAllLogs(true);
GoogleSignin.configure({
  webClientId:
    '91986739524-je9lbope2f8mfn7l0ld58k10dk00armv.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
