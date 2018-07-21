import { all, fork } from 'redux-saga/effects';

import watchLastFm from './watchLastFm';

export default function* rootSaga() {
  yield all([
    fork(watchLastFm)
]);
}
