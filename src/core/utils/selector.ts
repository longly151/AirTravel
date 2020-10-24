/* eslint-disable class-methods-use-this */
import { createSelector, OutputSelector } from 'reselect';
import { TObjectRedux, TArrayRedux } from './redux';

/**
 * Type
 */
type TObjectSelector = {
  loading: OutputSelector<unknown, any, (res: any) => any>;
  data: OutputSelector<unknown, any, (res: any) => any>;
  error: OutputSelector<unknown, any, (res: any) => any>;
};

type TArraySelector = {
  loading: OutputSelector<unknown, any, (res: any) => any>;
  data: OutputSelector<unknown, any, (res: any) => any>;
  metadata: OutputSelector<unknown, any, (res: any) => any>;
  error: OutputSelector<unknown, any, (res: any) => any>;
};

/**
 * Selector
 */

class CSelector {
  private static _instance: CSelector;

  private constructor() {
    // ...
  }

  public static get Instance(): CSelector {
    if (!this._instance) {
      this._instance = new this();
    }
    return CSelector._instance;
  }

  getSelector(root: any, field: string) {
    return createSelector(
      root,
      (data: any) => data[field],
    );
  }

  getInSelector(root: any, fields: Array<string>) {
    return createSelector(
      root,
      (data: any) => {
        let result = data;
        fields.forEach((e: any) => {
          result = result[e];
        });
        return result;
      }
    );
  }

  createObjectSelector(root: any, parentKey?: string): TObjectSelector {
    if (parentKey) {
      return ({
        loading: this.getInSelector(root, [parentKey, 'loading']),
        data: this.getInSelector(root, [parentKey, 'data']),
        error: this.getInSelector(root, [parentKey, 'error']),
      });
    }
    return ({
      loading: this.getSelector(root, 'loading'),
      data: this.getSelector(root, 'data'),
      error: this.getSelector(root, 'error'),
    });
  }

  createArraySelector(root: any, parentKey?: string): TArraySelector {
    if (parentKey) {
      return ({
        loading: this.getInSelector(root, [parentKey, 'loading']),
        data: this.getInSelector(root, [parentKey, 'data']),
        metadata: this.getInSelector(root, [parentKey, 'metadata']),
        error: this.getInSelector(root, [parentKey, 'error']),
      });
    }
    return ({
      loading: this.getSelector(root, 'loading'),
      data: this.getSelector(root, 'data'),
      metadata: this.getSelector(root, 'metadata'),
      error: this.getSelector(root, 'error'),
    });
  }

  getObject(selector: TObjectSelector, state: any): TObjectRedux {
    return ({
      loading: selector.loading(state),
      data: selector.data(state),
      error: selector.error(state),
    });
  }

  getArray(selector: TArraySelector, state: any): TArrayRedux {
    return ({
      loading: selector.loading(state),
      data: selector.data(state),
      metadata: selector.metadata(state),
      error: selector.error(state),
    });
  }
}

const Selector = CSelector.Instance;
export default Selector;
