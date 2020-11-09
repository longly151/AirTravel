import { put, call, takeLatest } from 'redux-saga/effects';
import Redux from '@utils/redux';
import {
  productGetList,
  productGetListSuccess,
  productGetListFail,
} from './slice';
import { fetchProducts } from './api';

export function* getListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchProducts, Redux.stringifyQuery(payload.query));
    yield put(productGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(productGetListFail(Redux.handleException(error)));
    return false;
  }
}

export default [
  takeLatest(productGetList, getListSaga),
];
