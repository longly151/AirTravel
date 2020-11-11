// import { fromJS } from 'immutable';
import Redux from '@utils/redux';

/**
 * NAME
 */
export const PARENT_NAME = '';
export const NAME = 'service';

export const LIST = 'list';
export const DETAIL = 'detail';

/**
 * TYPE
 */
export type TList = {
  serviceGetList: (state: any, action: any) => any;
  serviceGetListSuccess: (state: any, action: any) => any;
  serviceGetListFail: (state: any, action: any) => any;
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
  ...Redux.createArrayInitialState(LIST),
  ...Redux.createObjectInitialState(DETAIL),
};
