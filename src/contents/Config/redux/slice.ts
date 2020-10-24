import { createSlice } from '@reduxjs/toolkit';

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
export const INITIAL_STATE = ({
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
    switchTheme(state) {
      state.theme = state.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    },
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    resetRequireLogin(state) {
      state.requireLogin = INITIAL_STATE.requireLogin;
    },
  },
});

export const { switchTheme, changeLanguage, resetRequireLogin } = theme.actions;

export default theme.reducer;
