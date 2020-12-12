import loginSaga from '@contents/Auth/containers/Login/redux/saga';
import registerSaga from '@contents/Auth/containers/Register/redux/saga';

export default [...loginSaga, ...registerSaga];
