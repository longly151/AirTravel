import { put, call, takeLatest } from 'redux-saga/effects';
import Redux from '@utils/redux';
import { registerSuccess, registerFail, register } from './slice';
import { realtorRegisterApi } from './api';

export function* realtorRegisterSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(realtorRegisterApi, payload.data);
    yield put(registerSuccess(response.data));
    return true;
  } catch (error) {
    yield put(registerFail(Redux.handleException(error)));
    return false;
  }
}

export default [takeLatest(register, realtorRegisterSaga)];
