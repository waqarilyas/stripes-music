import axios from 'axios';
import Toast from 'react-native-toast-message';
import { BASE_URL } from './Constants';

export const thousandSeparator = (num = 0) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const convertToMinutes = (seconds = 0) => {
  const sec = seconds.toFixed(0);
  return (
    (seconds - (seconds %= 60)) / 60 + (seconds > 9 ? ':' : ':0') + seconds
  );
};

export const KFormatter = (num = 0) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
};

export const shuffleArray = (arr) => {
  let ctr = arr.length,
    temp,
    index;
  let tempArr = [];

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    tempArr.push(temp);
  }
  return tempArr;
};

export const customDocId = (uid, passedId) => {
  return uid < passedId
    ? uid.concat('**', passedId)
    : passedId.concat('**', uid);
};

export const displayToast = (title = '', message = '') => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: title,
    text2: message,
    visibilityTime: 3000,
    autoHide: true,
  });
};

export const updateAlbum = (albumId) => {
  return axios.get(`${BASE_URL}/updateAlbum?id=${albumId}`);
};

export const updateArtist = (artistId) => {
  return axios.get(`${BASE_URL}/updateArtist?id=${artistId}`);
};
