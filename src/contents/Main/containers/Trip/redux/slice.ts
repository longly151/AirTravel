/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
// import { REHYDRATE } from 'redux-persist';
import Redux from '@utils/redux';

/**
 * --- CONSTANT ---
 */
export const CONSTANT = {
  PARENT_NAME: '',
  NAME: 'bill',
  BILL_LIST: 'billList',
  BILL_FILTER: 'billFilter',
};

export type TList = {
  billGetList: (state: any, action: any) => any;
  billGetListSuccess: (state: any, action: any) => any;
  billGetListFail: (state: any, action: any) => any;
};

export type TDetail = {
  billGetDetail: (state: any, action: any) => any;
  billGetDetailSuccess: (state: any, action: any) => any;
  billGetDetailFail: (state: any, action: any) => any;
};

export const INITIAL_STATE = ({
  ...Redux.createArrayInitialState(CONSTANT.BILL_LIST),
  [CONSTANT.BILL_FILTER]: {},
});

/**
 * --- SLICE ---
 */
const slice = createSlice({
  name: CONSTANT.NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createArrayReducer<TList>('billGetList', CONSTANT.BILL_LIST),
  },
});

export const {
  billGetList, billGetListSuccess, billGetListFail,
} = slice.actions;

export default slice.reducer;
