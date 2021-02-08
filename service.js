import TrackPlayer, { TrackPlayerEvents } from 'react-native-track-player';
import {
  changeToMiniModal,
  fullScreenChange,
} from './src/Redux/Reducers/audioSlice';
import { displayVideoModal } from './src/Redux/Reducers/helperSlice';
import { store } from './src/Redux/store';


let listeners = [];
let timer = null;

const removeAllListeners = () => {
  listeners.map((listener) => {
    listener.remove();
  });
  clearInterval(timer);
};

module.exports = async function () {
  listeners.map((listener) => {
    listener.remove();
  });

  listeners = [
    TrackPlayer.addEventListener('remote-play', () => {
      store.dispatch(displayVideoModal(false));
      TrackPlayer.play();
    }),

    TrackPlayer.addEventListener('remote-pause', () => {
      console.log('------pause-------');
      TrackPlayer.pause();
    }),

    TrackPlayer.addEventListener('playback-state', (state) => {
      console.log('-----------PLAYER STATE----------', state);
    }),

    TrackPlayer.addEventListener('remote-stop', () => {
      store.dispatch(changeToMiniModal(false));
      store.dispatch(fullScreenChange(false));
      TrackPlayer.destroy();
      removeAllListeners();

    }),

    TrackPlayer.addEventListener('remote-next', () => {
      console.log('------ NEXT -------');
      TrackPlayer.skipToNext();
    }),
    TrackPlayer.addEventListener('remote-previous', () => {
      console.log('------previuse-------');
      TrackPlayer.skipToPrevious();
    }),
    TrackPlayer.addEventListener('remote-seek', (E) => {
      TrackPlayer.seekTo(E.position);
      TrackPlayer.play();
    }),
    TrackPlayer.addEventListener('remote-jump-forward', async (t) => {
      const duration = await TrackPlayer.getPosition();
      console.log('------SEEKING-------', duration);
      console.log('------JUMPING FORWARDS-------', t);
      TrackPlayer.seekTo(t.interval + duration);
    }),
    TrackPlayer.addEventListener('remote-jump-backward', async (t) => {

      const duration = await TrackPlayer.getPosition();

      TrackPlayer.seekTo(duration - t.interval);
    }),
    TrackPlayer.addEventListener('remote-duck', (X) => {
      console.log('------remote DUCK-------', X);
    }),
    TrackPlayer.addEventListener('playback-track-changed', (Z) => {
      console.log('------track player changed-------', Z);
    }),

    TrackPlayer.addEventListener('playback-queue-ended', (Z) => {
      console.log('------queue ended-------', Z);
    }),

    TrackPlayer.addEventListener('playback-error', () => {
      console.log('------playback-error-------');
    }),
  ];
  // ...
};
