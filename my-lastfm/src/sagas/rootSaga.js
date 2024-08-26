import { all, fork } from 'redux-saga/effects';

import watchLastFm from './watchLastFm';
import watchUser from './watchUser';
//import watchLastFmLoop from "./watchLastFmLoop";

export default function* rootSaga() {
  yield all([
    fork(watchLastFm),
    //fork(watchLastFmLoop),
    fork(watchUser),
]);
}
