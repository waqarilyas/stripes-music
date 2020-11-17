// Authentication Errors
export const WRONG_PASSWORD = 'auth/wrong-password';
export const USER_NOT_FOUND = 'auth/user-not-found';
export const NETWORK_ERROR = 'auth/network-request-failed';
export const USER_DISABLED = 'auth/user-disabled';
export const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
export const PLAYBACK_TIME_LIMIT_AUDIO = __DEV__ ? 2 : 30;
export const PLAYBACK_TIME_LIMIT_VIDEO = __DEV__ ? 2 : 60;
// LOGGER
export const LOG = (text, data = null) => {
  console.log(`---------------- ${text} ----------------`, data);
};
