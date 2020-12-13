import { all } from 'redux-saga/effects';
import authSaga from '@contents/Auth/redux/saga';
import productSaga from '@contents/Example/containers/Common/FlatList/WithRedux/redux/saga';
import serviceCategorySaga from '@contents/Main/containers/Home/containers/Categories/redux/saga';
import serviceSaga from '@contents/Service/redux/saga';
import billSaga from '@contents/Main/containers/Trip/redux/saga';

export default function* root() {
  yield all([
    ...authSaga,
    ...productSaga,
    ...serviceCategorySaga,
    ...serviceSaga,
    ...billSaga,
  ]);
}
