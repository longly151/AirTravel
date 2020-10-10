import { createSlice } from '@reduxjs/toolkit';
import { fromJS } from 'immutable';

/**
 * --- CONSTANT ---
 */

/**
 * Enum
 */
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum LanguageEnum {
  EN = 'en',
  VI = 'vi',
}

/**
 * Initial State
 */
export const INITIAL_STATE = fromJS({
  theme: ThemeEnum.LIGHT,
  language: LanguageEnum.EN,
  requireLogin: false,
});

/**
 * --- SLICE ---
 */
const theme = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    switchTheme: (state) => state.set('theme', state.get('theme') === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT),
    changeLanguage: (state, action) => state.set('language', action.payload),
    resetRequireLogin: (state) => state.set('requireLogin', INITIAL_STATE.get('requireLogin')),
  },
});

export const { switchTheme, changeLanguage, resetRequireLogin } = theme.actions;

export default theme.reducer;
