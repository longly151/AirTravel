import login from '@contents/Auth/containers/Login/redux/slice';
import register from '@contents/Auth/containers/Register/redux/slice';
import { combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['login'],
  blacklist: ['register'],
};

const auth = persistReducer(
  persistConfig,
  combineReducers({
    login,
    register,
  }),
);
export default auth;
