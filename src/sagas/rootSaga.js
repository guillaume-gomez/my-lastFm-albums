import { all, fork } from 'redux-saga/effects';

import watchLastFm from './watchLastFm';
import watchUser from './watchUser';

export default function* rootSaga() {
  yield all([
    fork(watchLastFm),
    fork(watchUser)
]);
}
