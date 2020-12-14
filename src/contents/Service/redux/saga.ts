import { put, call, takeLatest } from 'redux-saga/effects';
import { handleException } from '@utils/exception';
import Redux from '@utils/redux';
import {
  serviceGetList,
  serviceGetListSuccess,
  serviceGetListFail,
  serviceGetSpecialList,
  serviceGetSpecialListSuccess,
  serviceGetSpecialListFail,
  serviceGetHotDealList,
  serviceGetHotDealListSuccess,
  serviceGetHotDealListFail,
  serviceGetDetail,
  serviceGetDetailFail,
  serviceGetDetailSuccess,
} from './slice';
import {
  fetchServices,
  fetchServiceById,
  fetchServicesBestSeller,
} from './api';

export function* getListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(
      fetchServices,
      Redux.stringifyQuery(payload.query),
    );
    yield put(serviceGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(serviceGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getSpecialListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(
      fetchServices,
      Redux.stringifyQuery(payload.query),
    );
    yield put(serviceGetSpecialListSuccess(response));
    return true;
  } catch (error) {
    yield put(serviceGetSpecialListFail(yield* handleException(error)));
    return false;
  }
}

export function* getHotDealListSaga() {
  try {
    const response = yield call(fetchServicesBestSeller);
    yield put(serviceGetHotDealListSuccess(response));
    return true;
  } catch (error) {
    yield put(serviceGetHotDealListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDetailSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchServiceById, payload.id);
    yield put(serviceGetDetailSuccess(response.data));
    return true;
  } catch (error) {
    yield put(serviceGetDetailFail(yield* handleException(error)));
    return false;
  }
}

export default [
  takeLatest(serviceGetList, getListSaga),
  takeLatest(serviceGetSpecialList, getSpecialListSaga),
  takeLatest(serviceGetHotDealList, getHotDealListSaga),
  takeLatest(serviceGetDetail, getDetailSaga),
];
