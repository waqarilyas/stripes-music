import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    recentlyPlayed: [],
  },
  reducers: {
    addToRecentlyPlayed: (state, action) => {
      let data = action.payload;
      const currentState = state.recentlyPlayed;

      let filtered = currentState.filter((song) => song.id === data.id);

      if (filtered.length > 0) {
        let res = currentState.filter((song) => song.id != data.id);
        state.recentlyPlayed = [filtered[0], ...res];
      } else {
        state.recentlyPlayed = [data, ...currentState];
      }
    },
    removeFromPlaylist: (state, action) => {
      const index = state.playlist.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.playlist.splice(index, 1);
    },
  },
});

export const { addToRecentlyPlayed } = playerSlice.actions;

export default playerSlice.reducer;
