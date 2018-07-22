import { put, takeEvery } from 'redux-saga/effects';
import { lastFmActions } from "../constants";

import { lastFmResult, lastFmError } from '../actions/lastFmActions';

const api_key = process.env.REACT_APP_API_KEY;

function* lastfmQuery({ user, from, to }) {
    let url = `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyAlbumChart&user=${user}&api_key=${api_key}&format=json`;
    if(from) {
      url = `${url}&from=${from}`;
    }
    if(to) {
      url = `${url}&to=${to}`;
    }
    const response = yield fetch(url, {
      method: 'get',
    })
    .then((res) => res.json());
    const { error } = response;
    if(error) {
      yield put(lastFmError(response.message));
    } else {
      yield put(lastFmResult(response));
    }
}

function* watchLastFm() {
  yield takeEvery( lastFmActions.FETCH_LAST_FM, lastfmQuery);
}

export default watchLastFm;
