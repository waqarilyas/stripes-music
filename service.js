import TrackPlayer, { TrackPlayerEvents } from 'react-native-track-player';
import {
  changeToMiniModal,
  fullScreenChange,
} from './src/Redux/Reducers/audioSlice';
import { displayVideoModal } from './src/Redux/Reducers/helperSlice';
import { store } from './src/Redux/store';

let didAddListeners = false;
let userObj = null;
let listeners = [];
let timer = null;

const removeAllListeners = () => {
  listeners.map((listener) => {
    listener.remove();
  });
  clearInterval(timer);
};

<<<<<<< HEAD

        TrackPlayer.addEventListener('playback-error', () => {
            console.log('------playback-error-------');
        })
    ];
    // ...

};
=======
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
      try {
        store.dispatch(changeToMiniModal(false));
        store.dispatch(fullScreenChange(false));
      } catch (err) {}
      console.log('------STOP-------2');
      setTimeout(() => {
        TrackPlayer.destroy();
        removeAllListeners();
      }, 1000);
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
      console.log('------SEEKING-------', E);
      TrackPlayer.seekTo(E.position);
      TrackPlayer.play();
    }),
    TrackPlayer.addEventListener('remote-jump-forward', (t) => {
      console.log('------JUMPING FORWARDS-------', t);
    }),
    TrackPlayer.addEventListener('remote-jump-backward', (S) => {
      console.log('------JUM BACKWARD-------', S);
    }),
    TrackPlayer.addEventListener('remote-duck', (X) => {
      console.log('------remote DUCK-------', X);
    }),
    TrackPlayer.addEventListener('playback-track-changed', (Z) => {
      console.log('------track player chaned-------', Z);
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
>>>>>>> 533c9d1c267a98fbb3c4ba248fa63b770fb5e7c1
