import { put, takeEvery, call } from 'redux-saga/effects';
import { lastFmActions } from "../constants";

import { lastFmResult, lastFmError } from '../actions/lastFmActions';

function* lastfmQuery({ payload: {email, password} }) {
    const response = yield fetch("/oauth/token", {
        method: 'post',
        headers: {},
        body: JSON.stringify(
        {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "password",
          username: email,
          password: password
        }),
    })
    .then((res) => res.json());
    const { access_token } = response;
    if(access_token) {
      yield put(lastFmResult({ accessToken: access_token }));
    } else {
      yield put(lastFmError());
    }
}

function* watchLastFm() {
  yield takeEvery( lastFmActions.FETCH_LAST_FM, lastfmQuery);
}

export default watchLastFm;
