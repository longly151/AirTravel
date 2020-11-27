import { put, call, takeLatest } from 'redux-saga/effects';
import { handleException } from '@utils/exception';
import {
  serviceCategoryGetList,
  serviceCategoryGetListSuccess,
  serviceCategoryGetListFail,
  serviceCategoryGetDetail,
  serviceCategoryGetDetailFail,
  serviceCategoryGetDetailSuccess,
} from './slice';
import { fetchServiceCategories, fetchServiceCategoryById } from './api';
import mockCategories from '../data';

export function* getListSaga() {
  try {
    const response = yield call(fetchServiceCategories);

    response.data.map((e: any, index: any) => {
      let subtitle = '';
      e.children.map((ec: any) => {
        subtitle += `${ec.enName} - `;
        return ec;
      });
      e.illustration = mockCategories[index].illustration;
      if (subtitle === '') e.subtitle = mockCategories[index].subtitle;
      else {
        e.subtitle = subtitle.slice(0, subtitle.length - 3);
      }
      return e;
    });

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

export default [
  takeLatest(serviceCategoryGetList, getListSaga),
  takeLatest(serviceCategoryGetDetail, getDetailSaga),
];
