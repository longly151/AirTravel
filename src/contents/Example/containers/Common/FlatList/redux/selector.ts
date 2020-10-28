import Selector from '@utils/selector';
import { PARENT_NAME, NAME, LIST } from './slice';

export const root = (state: any) => {
  if (PARENT_NAME) return state[PARENT_NAME][NAME];
  return state[NAME];
};

export const productListSelector = Selector.createArraySelector(root, LIST);
