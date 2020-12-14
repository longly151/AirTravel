// import { fromJS } from 'immutable';
import Redux from '@utils/redux';

export const CONSTANT = {
  PARENT_NAME: '',
  NAME: 'service',
  LIST: 'list',
  SPECIAL_LIST: 'specialList',
  DETAIL: 'detail',
  FILTER: 'filter',
  HOT_DEAL_LIST: 'hotDealList',
};
/**
 * TYPE
 */
export type TList = {
  serviceGetList: (state: any, action: any) => any;
  serviceGetListSuccess: (state: any, action: any) => any;
  serviceGetListFail: (state: any, action: any) => any;
};

export type TSpecialList = {
  serviceGetSpecialList: (state: any, action: any) => any;
  serviceGetSpecialListSuccess: (state: any, action: any) => any;
  serviceGetSpecialListFail: (state: any, action: any) => any;
};

export type THotDealList = {
  serviceGetHotDealList: (state: any, action: any) => any;
  serviceGetHotDealListSuccess: (state: any, action: any) => any;
  serviceGetHotDealListFail: (state: any, action: any) => any;
};

export type TDetail = {
  serviceGetDetail: (state: any, action: any) => any;
  serviceGetDetailSuccess: (state: any, action: any) => any;
  serviceGetDetailFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
// export const INITIAL_STATE = fromJS({
//   ...Redux.createArrayInitialState(LIST),
//   ...Redux.createObjectInitialState(DETAIL),
// });S
export const INITIAL_STATE = {
  ...Redux.createArrayInitialState(CONSTANT.LIST),
  ...Redux.createArrayInitialState(CONSTANT.SPECIAL_LIST),
  ...Redux.createArrayInitialState(CONSTANT.HOT_DEAL_LIST),
  [CONSTANT.FILTER]: {},
  ...Redux.createObjectInitialState(CONSTANT.DETAIL),
};
