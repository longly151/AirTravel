import Selector from '@utils/selector';
import { CONSTANT } from './constant';

export const root = (state: any) => {
  if (CONSTANT.PARENT_NAME) return state[CONSTANT.PARENT_NAME][CONSTANT.NAME];
  return state[CONSTANT.NAME];
};

export const serviceListSelector = Selector.createArraySelector(
  root,
  CONSTANT.LIST,
);

export const serviceSpecialListSelector = Selector.createArraySelector(
  root,
  CONSTANT.SPECIAL_LIST,
);

export const serviceHotDealListSelector = Selector.createArraySelector(
  root,
  CONSTANT.HOT_DEAL_LIST,
);

export const serviceDetailSelector = Selector.createObjectSelector(
  root,
  CONSTANT.DETAIL,
);
