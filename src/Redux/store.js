import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import audioReducer from './Reducers/audioSlice';
import firebaseReducer from './Reducers/firebaseSlice';

const rootReducer = combineReducers({
  audio: audioReducer,
  firebase: firebaseReducer,
});

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});
