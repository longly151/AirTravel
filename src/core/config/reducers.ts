import { combineReducers } from 'redux';
import config from '@contents/Config/redux/slice';
import auth from '@contents/Auth/redux/reducer';
import bill from '@contents/Main/containers/Trip/redux/slice';
import product from '@contents/Example/containers/Common/FlatList/WithRedux/redux/slice';
import serviceCategory from '@contents/Main/containers/Home/containers/Categories/redux/slice';
import service from '@contents/Service/redux/slice';
import { Global } from '@utils/appHelper';
import _ from 'lodash';

const appReducers = combineReducers({
  config,
  auth,
  product,
  serviceCategory,
  service,
  bill,
});

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_REDUX') {
    // eslint-disable-next-line no-console
    console.log('RESET_REDUX Called');
    Global.token = '';
    // state = undefined;
    state = _.pick(state, ['config', 'service', 'serviceCategory']);
  }
  return appReducers(state, action);
};

export default rootReducer;
