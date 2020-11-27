import Selector from '@utils/selector';
import { PARENT_NAME, NAME, LIST, DETAIL, HOME_SCREEN_LIST } from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const serviceCategoryListSelector = Selector.createArraySelector(
  root,
  LIST,
);

export const serviceCategoryDetailSelector = Selector.createObjectSelector(
  root,
  DETAIL,
);

export const serviceCategoryHomeScreenListSelector = Selector.createArraySelector(
  root,
  HOME_SCREEN_LIST,
);
