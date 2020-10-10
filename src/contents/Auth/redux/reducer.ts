import login from '@contents/Auth/containers/Login/redux/slice';
import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

const immutableTransform = require('redux-persist-transform-immutable');

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  transforms: [immutableTransform()],
  whitelist: ['login'],
};

const auth = persistReducer(
  persistConfig, combineReducers({
    login,
  }),
);
export default auth;
