import { createSlice } from '@reduxjs/toolkit';
import Redux from '@utils/redux';
// import { REHYDRATE } from 'redux-persist';
import {
  INITIAL_STATE,
  TList,
  TDetail,
  CONSTANT,
  TSpecialList,
  THotDealList,
} from './constant';

const slice = createSlice({
  name: CONSTANT.NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createArrayReducer<TList>(
      `${CONSTANT.NAME}GetList`,
      CONSTANT.LIST,
    ),
    setFavourite: (state, action) => {
      state.listData.forEach((element: any, index: number) => {
        const { id, isFavourite } = action.payload;
        if (element.id === id) {
          state.listData[index].isFavourite = isFavourite;
        }
      });
      // state.serviceListRefreshCount += 1;
    },
    ...Redux.createArrayReducer<TSpecialList>(
      `${CONSTANT.NAME}GetSpecialList`,
      CONSTANT.SPECIAL_LIST,
    ),
    ...Redux.createArrayReducer<THotDealList>(
      `${CONSTANT.NAME}GetHotDealList`,
      CONSTANT.HOT_DEAL_LIST,
    ),
    serviceSetFilter: (state, action) => {
      state[CONSTANT.FILTER] = action.payload.filter;
    },
    ...Redux.createObjectReducer<TDetail>(
      `${CONSTANT.NAME}GetDetail`,
      CONSTANT.DETAIL,
    ),
  },
  // extraReducers: {
  //   [REHYDRATE]: (state, action) => {
  //     if (action.payload && action.payload.service) {
  //       const list = action.payload.service.get('list');
  //       return INITIAL_STATE.merge({
  //         list: INITIAL_STATE.get('list').merge({ data: list.get('data') }),
  //       });
  //     }
  //     return state;
  //   },
  // },
});

export const {
  serviceGetList,
  serviceGetListSuccess,
  serviceGetListFail,
  setFavourite,
  serviceGetSpecialList,
  serviceGetSpecialListSuccess,
  serviceGetSpecialListFail,
  serviceGetHotDealList,
  serviceGetHotDealListSuccess,
  serviceGetHotDealListFail,
  serviceSetFilter,
  serviceGetDetail,
  serviceGetDetailSuccess,
  serviceGetDetailFail,
} = slice.actions;

export default slice.reducer;
