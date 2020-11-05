import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import audioReducer from './Reducers/audioSlice';
import firebaseReducer from './Reducers/firebaseSlice';
import idReducer from './Reducers/idsSlice';
import helperReducer from './Reducers/helperSlice';

const rootReducer = combineReducers({
  audio: audioReducer,
  firebase: firebaseReducer,
  ids: idReducer,
  helpers: helperReducer,
});

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});
