import { createSlice } from '@reduxjs/toolkit';

export const helperSlice = createSlice({
  name: 'helpers',
  initialState: {
    list: [],
    subscriptionModal: false,
    videoModal: false,
    videoData: {},
  },
  reducers: {
    addToList: (state, action) => {
      state.list = action.payload;
    },
    displaySubscriptionScreen: (state, action) => {
      state.subscriptionModal = action.payload;
    },
    displayVideoModal: (state, action) => {
      state.videoModal = action.payload;
    },
    setVideoData: (state, action) => {
      state.videoData = action.payload;
    },
  },
});

export const {
  addToList,
  displaySubscriptionScreen,
  displayVideoModal,
  setVideoData,
} = helperSlice.actions;

export default helperSlice.reducer;
