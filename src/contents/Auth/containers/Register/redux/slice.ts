import { createSlice } from '@reduxjs/toolkit';
import Redux from '@utils/redux';

/**
 * --- CONSTANT ---
 */

export const PARENT_NAME = 'auth';
export const NAME = 'register';

type T = {
  register: (state: any, action: any) => any;
  registerSuccess: (state: any, action: any) => any;
  registerFail: (state: any, action: any) => any;
};

const INITIAL_STATE = Redux.createObjectInitialState();

/**
 * --- SLICE ---
 */
const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createObjectReducer<T>(NAME),
  },
});

export const { register, registerSuccess, registerFail } = slice.actions;

export default slice.reducer;
