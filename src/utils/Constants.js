import TrackPlayer from 'react-native-track-player';

export const BASE_URL = 'https://us-central1-musicapp-956bc.cloudfunctions.net';
export const SEARCH_BASE_URL =
  'https://us-central1-musicapp-956bc.cloudfunctions.net/api/stripes/';

export const GOOGLE_WEB_CLIENT_ID =
  '91986739524-je9lbope2f8mfn7l0ld58k10dk00armv.apps.googleusercontent.com';

// Authentication Errors
export const WRONG_PASSWORD = 'auth/wrong-password';
export const USER_NOT_FOUND = 'auth/user-not-found';
export const NETWORK_ERROR = 'auth/network-request-failed';
export const USER_DISABLED = 'auth/user-disabled';
export const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
// export const PLAYBACK_TIME_LIMIT_AUDIO = __DEV__ ? 60 : 30;
// export const PLAYBACK_TIME_LIMIT_VIDEO = __DEV__ ? 60 : 60;
export const PLAYBACK_TIME_LIMIT_AUDIO = 30;
export const PLAYBACK_TIME_LIMIT_VIDEO = 30;
// LOGGER
export const LOG = (text, data = null) => {
  console.log(`------ ${text} ------`, data);
};

export const PLAYER_CONFIG = {
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_SEEK_TO,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_SET_RATING,
    TrackPlayer.CAPABILITY_PLAY_FROM_ID,
    TrackPlayer.CAPABILITY_JUMP_FORWARD,
    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
  ],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_SEEK_TO,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    TrackPlayer.CAPABILITY_SET_RATING,
    TrackPlayer.CAPABILITY_PLAY_FROM_ID,
    TrackPlayer.CAPABILITY_JUMP_FORWARD,
    TrackPlayer.CAPABILITY_JUMP_BACKWARD,
  ],
  notificationCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_SEEK_TO,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    // TrackPlayer.CAPABILITY_SET_RATING,
    // TrackPlayer.CAPABILITY_PLAY_FROM_ID,
    // TrackPlayer.CAPABILITY_JUMP_FORWARD,
    // TrackPlayer.CAPABILITY_JUMP_BACKWARD,
  ],
};
