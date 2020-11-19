import { createSlice } from '@reduxjs/toolkit';
import { LOG } from '../../utils/Constants';

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    currentSong: {},
    isFullScreen: false,
    miniModalOpen: false,
    initialPlay: true,
    playlist: [],
    bannerSongs: [],
  },
  reducers: {
    changeSong: (state, action) => {
      state.currentSong = action.payload;
    },
    fullScreenChange: (state, action) => {
      state.isFullScreen = action.payload;
    },
    changeToMiniModal: (state, action) => {
      state.miniModalOpen = action.payload;
    },
    isInitialPlay: (state, action) => {
      state.initialPlay = action.payload;
    },
    pushToPlaylist: (state, action) => {
      state.playlist = [...state.playlist, action.payload];
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    removeFromPlaylist: (state, action) => {
      const index = state.playlist.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.playlist.splice(index, 1);
    },
  },
});

export const {
  changeSong,
  fullScreenChange,
  changeToMiniModal,
  pushToPlaylist,
  setPlaylist,
  isInitialPlay,
  removeFromPlaylist,
} = audioSlice.actions;

export default audioSlice.reducer;
