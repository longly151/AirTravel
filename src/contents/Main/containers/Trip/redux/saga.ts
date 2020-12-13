/* eslint-disable @typescript-eslint/no-unused-vars */
import { put, call, takeLatest, select } from 'redux-saga/effects';
import Redux, { TQuery } from '@utils/redux';
import Filter from '@utils/filter';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import _ from 'lodash';
import moment from 'moment';
import {
  billGetList,
  billGetListSuccess,
  billGetListFail,
} from './slice';
import { fetchBills } from './api';

let timeArray: any = [];

export function* getListSaga({ payload }: { payload: any }) {
  try {
    const me = yield select((state) => state.auth.login);
    const filter = new Filter();

    filter.mergeFilter('customer.id', '$eq', me.data.id);
    const query: TQuery = {
      ...payload.query,
      filter: filter.filterObject,
    };

    const response = yield call(fetchBills, Redux.stringifyQuery(query));

    if (!payload.query.page || payload.query.page === 1) timeArray = [];
    response.data.forEach((e:any, index: number) => {
      const time = moment(e.billServices[0].startDate).format('YYYY-MM-DD');

      if (time !== 'Invalid date' && !_.includes(timeArray, time)) {
        response.data[index].time = time;
        timeArray.push(time);
      }
    });

    yield put(billGetListSuccess(response));
    return true;
  } catch (error) {
    yield put(billGetListFail(Redux.handleException(error)));
    return false;
  }
}

export default [
  takeLatest(billGetList, getListSaga),
];
