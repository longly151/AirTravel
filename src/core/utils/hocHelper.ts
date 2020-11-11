/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */

import { createSelector } from 'reselect';
import _ from 'lodash';
import Selector from './selector';
import AppHelper from './appHelper';

/**
 * Type
 */

/**
 * HOC
 */
export interface IExtraItem {
  key: string;
  url: string;
}

export interface IReduxExtraItem {
  key: string;
  dispatch: any,
  constant: {
    PARENT_NAME: string,
    NAME: string,
    KEY: string,
  },
}

export interface IHocConstant {
  PARENT_NAME?: string,
  NAME: string,
  KEY: string,
  FILTER_KEY?: string
}

class CHocHelper {
  private static _instance: CHocHelper;

  private constructor() {
    // ...
  }

  public static get Instance(): CHocHelper {
    if (!this._instance) {
      this._instance = new this();
    }
    return CHocHelper._instance;
  }

  createObjectSelectorHOC(constant: IHocConstant) {
    const { PARENT_NAME, NAME, KEY } = constant;
    const root = (state: any) => {
      if (PARENT_NAME) return state[PARENT_NAME][NAME];
      return state[NAME];
    };
    return Selector.createObjectSelector(root, KEY);
  }

  createArraySelectorHOC(constant: IHocConstant) {
    const { PARENT_NAME, NAME, KEY, FILTER_KEY } = constant;
    const root = (state: any) => {
      if (PARENT_NAME) return state[PARENT_NAME][NAME];
      return state[NAME];
    };
    const listSelector = Selector.createArraySelector(root, KEY);
    const filterSelector = FILTER_KEY ? createSelector(root, (data: any) => data[FILTER_KEY]) : null;
    return {
      listSelector,
      filterSelector
    };
  }

  mergeStateForExtraData(state: any, extraData?: IExtraItem[]) {
    if (extraData && !_.isEmpty(extraData)) {
      extraData.forEach((item: IExtraItem) => {
        state[item.key] = {
          loading: true,
          data: {},
          error: null,
        };
      });
    }
  }

  async triggerActionForReduxExtraData(thisProps: any, reduxExtraData?: IReduxExtraItem[]) {
    if (reduxExtraData && !_.isEmpty(reduxExtraData)) {
      await Promise.all(reduxExtraData.map(async (item: IReduxExtraItem) => {
        thisProps[`getDetail${item.key}`](AppHelper.getItemFromParams(thisProps));
      }));
    }
  }

  mapStateForReduxExtraData(result: any, state: any, reduxExtraData?: IReduxExtraItem[]) {
    let newResult = result;
    if (reduxExtraData && !_.isEmpty(reduxExtraData)) {
      reduxExtraData.forEach((item: IReduxExtraItem) => {
        newResult = {
          ...newResult,
          [item.key]: { ...Selector.getObject(this.createObjectSelectorHOC(item.constant), state) },
        };
      });
    }
    return newResult;
  }

  mapDispatchForReduxExtraData(result: any, dispatch: any, reduxExtraData?: IReduxExtraItem[]) {
    let newResult = result;
    if (reduxExtraData && !_.isEmpty(reduxExtraData)) {
      reduxExtraData.forEach((reduxExtraItem: IReduxExtraItem) => {
        newResult = {
          ...newResult,
          [`getDetail${reduxExtraItem.key}`]: (item: any) => dispatch(reduxExtraItem.dispatch(item)),
        };
      });
    }
    return newResult;
  }
}

const HocHelper = CHocHelper.Instance;
export default HocHelper;
