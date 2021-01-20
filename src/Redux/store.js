import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import audioReducer from './Reducers/audioSlice';
import firebaseReducer from './Reducers/firebaseSlice';
import idReducer from './Reducers/idsSlice';
import helperReducer from './Reducers/helperSlice';
import playerSlice from './Reducers/playerSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['player'],
};

const reducers = combineReducers({
  audio: audioReducer,
  firebase: firebaseReducer,
  ids: idReducer,
  helpers: helperReducer,
  player: playerSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

let enhancedCompose = compose;
if (__DEV__) {
  enhancedCompose = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
}

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: enhancedCompose(middleware),
});

export const persist = persistStore(store);
