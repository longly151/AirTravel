import { put, call, takeLatest } from 'redux-saga/effects';
import { handleException } from '@utils/exception';
import Redux from '@utils/redux';
import {
  serviceCategoryGetList,
  serviceCategoryGetListSuccess,
  serviceCategoryGetListFail,
  serviceCategoryGetDetail,
  serviceCategoryGetDetailFail,
  serviceCategoryGetDetailSuccess,
  serviceCategoryGetHomeScreenList,
  serviceCategoryGetHomeScreenListSuccess,
  serviceCategoryGetHomeScreenListFail,
} from './slice';
import { fetchServiceCategories, fetchServiceCategoryById } from './api';
import mockCategories from '../data';

export function* getListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(
      fetchServiceCategories,
      Redux.stringifyQuery(payload.query),
    );

    yield put(serviceCategoryGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(serviceCategoryGetListFail(yield* handleException(error)));
    return false;
  }
}

export function* getDetailSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(fetchServiceCategoryById, payload.id);
    yield put(serviceCategoryGetDetailSuccess(response));
    return true;
  } catch (error) {
    yield put(serviceCategoryGetDetailFail(yield* handleException(error)));
    return false;
  }
}

export function* getHomeScreenListSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(
      fetchServiceCategories,
      Redux.stringifyQuery(payload.query),
    );

    response.data.map((e: any, index: any) => {
      let enSubtitle = '';
      let viSubtitle = '';
      e.children.map((ec: any) => {
        enSubtitle += `${ec.enName} - `;
        viSubtitle += `${ec.viName} - `;
        return ec;
      });
      e.illustration = mockCategories[index].illustration;
      if (enSubtitle === '') e.enSubtitle = mockCategories[index].subtitle;
      if (viSubtitle === '') e.viSubtitle = mockCategories[index].subtitle;
      else {
        e.enSubtitle = enSubtitle.slice(0, enSubtitle.length - 3);
        e.viSubtitle = viSubtitle.slice(0, viSubtitle.length - 3);
      }
      return e;
    });

    yield put(serviceCategoryGetHomeScreenListSuccess(response));
    return true;
  } catch (error) {
    yield put(
      serviceCategoryGetHomeScreenListFail(yield* handleException(error)),
    );
    return false;
  }
}

export default [
  takeLatest(serviceCategoryGetList, getListSaga),
  takeLatest(serviceCategoryGetDetail, getDetailSaga),
  takeLatest(serviceCategoryGetHomeScreenList, getHomeScreenListSaga),
];
