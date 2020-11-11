// import { fromJS } from 'immutable';
import Redux from '@utils/redux';

/**
 * NAME
 */
export const PARENT_NAME = '';
export const NAME = 'serviceCategory';

export const LIST = 'list';
export const DETAIL = 'detail';

/**
 * TYPE
 */
export type TList = {
  serviceCategoryGetList: (state: any, action: any) => any;
  serviceCategoryGetListSuccess: (state: any, action: any) => any;
  serviceCategoryGetListFail: (state: any, action: any) => any;
};
export type TDetail = {
  serviceCategoryGetDetail: (state: any, action: any) => any;
  serviceCategoryGetDetailSuccess: (state: any, action: any) => any;
  serviceCategoryGetDetailFail: (state: any, action: any) => any;
};

/**
 * INITIAL_STATE
 */
// export const INITIAL_STATE = fromJS({
//   ...createArrayInitialState(LIST),
//   ...createObjectInitialState(DETAIL),
// });
export const INITIAL_STATE = {
  ...Redux.createArrayInitialState(LIST),
  ...Redux.createObjectInitialState(DETAIL),
};
