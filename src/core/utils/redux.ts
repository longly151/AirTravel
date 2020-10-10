/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { fromJS } from 'immutable';
import _ from 'lodash';
import Config from 'react-native-config';
import qs from 'qs';
import Filter from './filter';

/**
 * Type
 */
export type TError = {
  code: number;
  messages: Array<string>;
};

export type TMetadata = {
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

export type TObjectRedux = {
  loading: boolean;
  data: any;
  error: null | TError;
};

export type TArrayRedux = {
  loading: boolean;
  data: any;
  metadata: any;
  error: null | TError;
};

export type TQuery = {
  fields?: Array<string>;
  page?: number;
  limit?: number;
  filter?: Filter;
};

/**
 * Redux
 */
class CRedux {
  private static _instance: CRedux;

  private constructor() {
    // ...
  }

  public static get Instance(): CRedux {
    if (!this._instance) {
      this._instance = new this();
    }
    return CRedux._instance;
  }

  createObjectInitialState(parentKey?: string) {
    const result: TObjectRedux = {
      loading: false,
      data: {},
      error: null,
    };
    if (parentKey) {
      const parentResult: any = {};
      parentResult[parentKey] = result;
      return parentResult;
    }
    return result;
  }

  createArrayInitialState(parentKey?: string) {
    const result: TArrayRedux = {
      loading: false,
      data: [],
      metadata: {
        count: 10,
        total: 0,
        page: 1,
        pageCount: 1,
      },
      error: null,
    };
    if (parentKey) {
      const parentResult: any = {};
      parentResult[parentKey] = result;
      return parentResult;
    }
    return result;
  }

  createObjectReducer<T>(
    name: string,
    parentKey?: string,
    listKey?: string,
  ): T {
    const result: any = {};
    if (parentKey) {
      result[`${name}`] = (state: any, action: any) => {
        if (listKey) {
          const dataInList = state
            .get(listKey)
            .get('data')
            .filter((item: any) => item.get('id') === action.payload.id);
          if (!dataInList.isEmpty()) {
            return state
              .setIn([parentKey, 'loading'], true)
              .setIn([parentKey, 'data'], dataInList.get(0))
              .setIn([parentKey, 'error'], null);
          }
          return state
            .setIn([parentKey, 'loading'], true)
            .setIn([parentKey, 'error'], null);
        }
        return state
          .setIn([parentKey, 'loading'], true)
          .setIn([parentKey, 'error'], null);
      };
      result[`${name}Success`] = (state: any, action: any) => {
        const data = fromJS(action.payload);
        return state
          .setIn([parentKey, 'loading'], false)
          .mergeIn([parentKey, 'data'], data)
          .setIn([parentKey, 'error'], null);
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;
        return state
          .setIn([parentKey, 'loading'], false)
          .setIn([parentKey, 'error'], error);
      };
    } else {
      result[`${name}`] = (state: any, action: any) => {
        if (listKey) {
          const dataInList = state
            .get(listKey)
            .get('data')
            .filter((item: any) => item.get('id') === action.payload.id);
          if (!dataInList.isEmpty()) {
            return state
              .set('loading', true)
              .set('data', dataInList.get(0))
              .set('error', null);
          }
          return state.set('loading', true).set('error', null);
        }
        return state.set('loading', true).set('error', null);
      };
      result[`${name}Success`] = (state: any, action: any) => {
        const data = fromJS(action.payload);
        return state.set('loading', false).set('data', data).set('error', null);
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;

        // Modify Error Message
        // error.messages.push('Another Message');

        return state.set('loading', false).set('error', error);
      };
    }
    return result;
  }

  createArrayReducer<T>(name: string, parentKey?: string): T {
    const result: any = {};
    if (parentKey) {
      result[name] = (state: any, action: any) => state
        .setIn([parentKey, 'loading'], true)
        .setIn([parentKey, 'error'], null);
      result[`${name}Success`] = (state: any, action: any) => {
      // console.log('action.payload', parentKey, action.payload);

        const metadata = fromJS(action.payload.metadata);
        const dataGet = action.payload.results;
        if (metadata) {
          const currentPage = action.payload.metadata?.page;
          const data = currentPage === 1 || !currentPage
            ? fromJS(dataGet)
            : state
              .getIn([parentKey, 'data'])
              .concat(
                fromJS(dataGet).filter(
                  (item: any) => state.getIn([parentKey, 'data']).indexOf(item) < 0,
                ),
              );
          return state
            .setIn([parentKey, 'loading'], false)
            .setIn([parentKey, 'data'], data)
            .setIn([parentKey, 'metadata'], metadata)
            .setIn([parentKey, 'error'], null);
        }
        const data = fromJS(dataGet);
        return state
          .setIn([parentKey, 'loading'], false)
          .setIn([parentKey, 'data'], data)
          .setIn([parentKey, 'error'], null);
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;
        return state
          .setIn([parentKey, 'loading'], false)
          .setIn([parentKey, 'error'], error);
      };
    } else {
      result[name] = (state: any, action: any) => state.set('loading', true).set('error', null);
      result[`${name}Success`] = (state: any, action: any) => {
        const dataGet = action.payload.results;
        const metadata = fromJS(action.payload.metadata);
        if (metadata) {
          const currentPage = action.payload.metadata?.page;
          const data = currentPage === 1
            ? fromJS(dataGet)
            : state
              .get('data')
              .concat(
                fromJS(dataGet).filter(
                  (item: any) => state.get('data').indexOf(item) < 0,
                ),
              );
          return state
            .set('loading', false)
            .set('data', data)
            .set('metadata', metadata)
            .set('error', null);
        }
        const data = fromJS(dataGet);
        return state
          .setIn([parentKey, 'loading'], false)
          .setIn([parentKey, 'data'], data)
          .setIn([parentKey, 'error'], null);
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;

        // Modify Error Message
        // error.messages.push('Another Message');

        return state.set('loading', false).set('error', error);
      };
    }
    return result;
  }

  stringifyQuery(query: TQuery) {
    let defaultLimit = parseInt(Config.PER_PAGE, 10);
    if (Number.isNaN(defaultLimit)) {
      defaultLimit = 10;
    }
    const limit = query?.limit ? query.limit : defaultLimit;
    const offset = query?.page && query.page >= 1 ? (query.page - 1) * limit : 0;
    let handledQuery: any = _.omit(query, ['page']);
    handledQuery.offset = offset;
    handledQuery.limit = limit;

    if (_.has(handledQuery, 'filter')) {
      handledQuery.filter = JSON.stringify(handledQuery.filter);
    }

    // Nestjs (replace "filter" by "s")
    handledQuery.s = handledQuery.filter;
    handledQuery = _.omit(handledQuery, 'filter');

    const stringifiedQuery = qs.stringify(handledQuery, {
      indices: false,
      strictNullHandling: true,
      arrayFormat: 'comma',
    });
    return stringifiedQuery;
  }
}
const Redux = CRedux.Instance;
export default Redux;
