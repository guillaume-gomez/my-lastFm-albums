import { put, takeEvery, all, fork } from 'redux-saga/effects';
import { lastFmActions } from "../constants";

import { lastFmWeekAlbum, lastFmWeekAlbumError} from '../actions/lastFmActions';

import { lastFmAlbumInfosQuery } from "./watchAlbumInfos";

const api_key = import.meta.env.VITE_LAST_FM;

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
    const { weeklyalbumchart, error } = response;
    if(error) {
      yield put(lastFmWeekAlbumError(response.message));
    } else {
      yield put(lastFmWeekAlbum(weeklyalbumchart));
      const { album } = weeklyalbumchart;
      yield all(album.map(a => fork(lastFmAlbumInfosQuery,{ user, album: a })))
    }
}

function* watchLastFm() {
  yield takeEvery( lastFmActions.FETCH_LAST_FM, lastfmQuery);
}

export default watchLastFm;
