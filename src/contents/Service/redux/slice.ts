import { createSlice } from '@reduxjs/toolkit';
import Redux from '@utils/redux';
// import { REHYDRATE } from 'redux-persist';
import { INITIAL_STATE, TList, NAME, TDetail, LIST, DETAIL } from './constant';

const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createArrayReducer<TList>(`${NAME}GetList`, LIST),
    ...Redux.createObjectReducer<TDetail>(`${NAME}GetDetail`, DETAIL),
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
  serviceGetDetail,
  serviceGetDetailSuccess,
  serviceGetDetailFail,
} = slice.actions;

export default slice.reducer;
