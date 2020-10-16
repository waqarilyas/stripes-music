import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

export const getBanners = createAsyncThunk(
  'getBanners/getAllBanners',
  async () => {
    let data = [];
    firestore()
      .collection('songs')
      .get()
      .then((documents) => {
        documents.forEach((document) => {
          if (document.exists) {
            data.push(document.data());
          }
        });
        return [...state, data];
      });
  },
);

export const firebaseSlice = createSlice({
  name: 'audio',
  initialState: {
    bannerSongs: [],
  },
  extraReducers: {
    [getBanners.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getBanners.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.bannerSongs = state.banners.concat(action.payload);
    },
    [getBanners.rejected]: (state, action) => {
      state.status = 'loading';
      state.error = 'Error fetching results';
    },
  },
});

export const {} = firebaseSlice.actions;

export default firebaseSlice.reducer;
