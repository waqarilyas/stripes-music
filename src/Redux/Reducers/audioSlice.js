import { createSlice } from '@reduxjs/toolkit';

export const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    currentSong: {},
    isFullScreen: false,
    miniModalOpen: false,
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
    pushToPlaylist: (state, action) => {
      state.playlist = [...state.playlist, action.payload];
    },
    removeFromPlaylist: (state, action) => {
      const index = state.playlist.findIndex(
        (item) => item.id === action.payload.id,
      );
      console.log(index);
      state.playlist.splice(index, 1);
    },
  },
});

export const {
  changeSong,
  fullScreenChange,
  changeToMiniModal,
  pushToPlaylist,
  removeFromPlaylist,
} = audioSlice.actions;

export default audioSlice.reducer;
