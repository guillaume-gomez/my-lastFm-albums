import { takeEvery, all, fork } from 'redux-saga/effects';
import { lastFmActions } from "../constants";

import { lastfmQuery } from "./watchLastFm";

const api_key = import.meta.env.VITE_LAST_FM;

function* lastfmWeeksQuery({ user, weeks }) {
  const data = [];
  weeks.forEach(week => {
    yield* all(data.map(a => fork(lastfmQuery,{ user, from: weeks.from, to: weeks.to })))
  });
}

function* watchLastFm() {
  yield takeEvery( lastFmActions.FETCH_LAST_FM_WEEKS, lastfmWeeksQuery);
}

export default watchLastFmLoop;
