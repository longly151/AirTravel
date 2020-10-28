import AppHelper from '@utils/appHelper';
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import _ from 'lodash';
import Config from 'react-native-config';
import qs from 'qs';
import Filter from './filter';
// eslint-disable-next-line import/no-cycle
import Api from './api';

/**
 * Type
 */
const dataPrefix = 'data';
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
 * Interface
 */
export interface BaseState {
  loading: boolean;
  data: any;
  error: any;
}

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
  ): T {
    const result: any = {};
    if (parentKey) {
      result[`${name}`] = (state: any, action: any) => {
        state[parentKey].data = action.payload || {};
        state[parentKey].loading = true;
        state[parentKey].error = null;
      };
      result[`${name}Success`] = (state: any, action: any) => {
        const data = action.payload;
        state[parentKey].data = data;
        state[parentKey].loading = false;
        state[parentKey].error = null;
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;
        state[parentKey].loading = false;
        state[parentKey].error = error;
      };
    } else {
      result[`${name}`] = (state: any, action: any) => {
        state.data = action.payload || {};
        state.loading = true;
        state.error = null;
      };
      result[`${name}Success`] = (state: any, action: any) => {
        const data = action.payload;
        state.data = data;
        state.loading = false;
        state.error = null;
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;

        // Modify Error Message
        // error.messages.push('Another Message');
        state.loading = false;
        state.error = error;
      };
    }
    return result;
  }

  createArrayReducer<T>(name: string, parentKey?: string): T {
    const result: any = {};
    if (parentKey) {
      result[name] = (state: any, action: any) => {
        state[parentKey].loading = true;
        state[parentKey].error = null;
      };
      result[`${name}Success`] = (state: any, action: any) => {
      // console.log('action.payload', parentKey, action.payload);

        const { metadata } = action.payload;
        const dataGet = action.payload[dataPrefix];
        let data = dataGet;
        if (metadata) {
          const currentPage = action.payload.metadata?.page;
          data = currentPage === 1 || !currentPage
            ? dataGet
            : state[parentKey].data.concat(
              dataGet.filter(
                (item: any) => state[parentKey].data.indexOf(item) < 0,
              ),
            );
        }
        state[parentKey].loading = false;
        state[parentKey].data = data;
        state[parentKey].metadata = metadata;
        state[parentKey].error = null;
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;
        state[parentKey].loading = false;
        state[parentKey].error = error;
      };
    } else {
      result[name] = (state: any, action: any) => {
        state.loading = true;
        state.error = null;
      };
      result[`${name}Success`] = (state: any, action: any) => {
        const dataGet = action.payload[dataPrefix];
        const { metadata } = action.payload;
        let data = dataGet;
        if (metadata) {
          const currentPage = action.payload.metadata?.page;
          data = currentPage === 1
            ? dataGet
            : state.data.concat(
              dataGet.filter(
                (item: any) => state.data.indexOf(item) < 0,
              ),
            );
          state.data = data;
          state.metadata = metadata;
          state.error = null;
        }
        state.data = data;
        state.loading = false;
        state.metadata = metadata;
        state.error = null;
      };
      result[`${name}Fail`] = (state: any, action: any) => {
        const error = action.payload;

        // Modify Error Message
        // error.messages.push('Another Message');
        state.loading = false;
        state.error = error;
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

  initDetail(props: any) {
    return {
      loading: true,
      data: AppHelper.getItemFromParams(props),
      error: null,
    };
  }

  async fetchDetail(props: any, preApi: string) {
    const initialData = AppHelper.getItemFromParams(props);
    const api = preApi.replace(':id', initialData.id);
    try {
      const response = await Api.get(api);
      return {
        loading: false,
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        loading: false,
        data: [],
        error,
      };
    }
  }
}
const Redux = CRedux.Instance;
export default Redux;
