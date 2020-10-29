import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import Redux from '@utils/redux';

/**
 * --- CONSTANT ---
 */
export const PARENT_NAME = '';
export const NAME = 'product';

export const LIST = 'list';

export type TList = {
  productGetList: (state: any, action: any) => any;
  productGetListSuccess: (state: any, action: any) => any;
  productGetListFail: (state: any, action: any) => any;
};

export const INITIAL_STATE = ({
  ...Redux.createArrayInitialState(LIST),
});

/**
 * --- SLICE ---
 */
const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createArrayReducer<TList>('productGetList', LIST),
  },
  // extraReducers: {
  //   [REHYDRATE]: (state, action) => {
  //     if (action.payload && action.payload.product) {
  //       const { list } = action.payload.product;
  //       INITIAL_STATE.list.data = list.data;
  //       return INITIAL_STATE;
  //     }
  //     return state;
  //   },
  // },
});

export const {
  productGetList, productGetListSuccess, productGetListFail,
} = slice.actions;

export default slice.reducer;
