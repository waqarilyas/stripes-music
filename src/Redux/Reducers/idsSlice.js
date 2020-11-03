import { createSlice } from '@reduxjs/toolkit';

export const idsSlice = createSlice({
  name: 'ids',
  initialState: {
    artistId: '',
  },
  reducers: {
    getArtistId: (state, action) => {
      state.artistId = action.payload;
    },
  },
});

export const { getArtistId } = idsSlice.actions;

export default idsSlice.reducer;
