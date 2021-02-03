import { createSlice } from '@reduxjs/toolkit';

export const helperSlice = createSlice({
  name: 'helpers',
  initialState: {
    list: [],
    subscriptionModal: false,
    videoModal: false,
    videoData: {},
    isVideoPlaying: false,
    currentTime: 0,
    isChatPaid: false,
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
    setVidoReferences: (state, action) => {
      state.isVideoPlaying = action.payload.isVideoPlaying;
      state.currentTime = action.payload.currentTime;
    },
    setIsChatNotPaid: (state, action) => {
      state.isChatPaid = action.payload;
    },
  },
});

export const {
  addToList,
  displaySubscriptionScreen,
  displayVideoModal,
  setVideoData,
  setVidoReferences,
  setIsChatNotPaid,
} = helperSlice.actions;

export default helperSlice.reducer;
