import Selector from '@utils/selector';
import { PARENT_NAME, NAME, LIST, DETAIL } from './constant';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const serviceListSelector = Selector.createArraySelector(root, LIST);

export const serviceDetailSelector = Selector.createObjectSelector(
  root,
  DETAIL,
);
