import { put, takeEvery } from 'redux-saga/effects';
import { userActions } from "../constants";

import { fetchUserSuccess, fetchUserError, resetLastFmData, lasfmQueryWeekAlbum } from '../actions/lastFmActions';

const api_key = process.env.REACT_APP_API_KEY;

function* lastfmQuery({ user }) {
    yield put(resetLastFmData());
    let url = `https://ws.audioscrobbler.com/2.0/?method=user.getInfo&user=${user}&api_key=${api_key}&format=json`;
    const response = yield fetch(url, {
      method: 'get',
    })
    .then((res) => res.json());
    const { error } = response;
    if(error) {
      yield put(fetchUserError(response.message));
    } else {
      yield put(fetchUserSuccess(response.user));
      yield put(lasfmQueryWeekAlbum(response.user.name));
    }
}

function* watchLastFm() {
  yield takeEvery( userActions.FETCH_USER_DATA, lastfmQuery);
}

export default watchLastFm;
