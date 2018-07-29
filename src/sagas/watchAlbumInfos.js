import { put } from 'redux-saga/effects';

import { fetchAlbumInfosSuccess, fetchAlbumInfosError} from '../actions/lastFmActions';

const api_key = process.env.REACT_APP_API_KEY;

export function* lastFmAlbumInfosQuery(params) {
    const { user, album} = params;
    let url = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&user=${user}&api_key=${api_key}&artist=${album.artist["#text"]}&album=${album.name}&format=json`;
    const response = yield fetch(url, {
      method: 'get',
    })
    .then((res) => res.json());
    const { error } = response;
    if(error) {
      yield put(fetchAlbumInfosError(response.message));
    } else {
      yield put(fetchAlbumInfosSuccess(response.album));
    }
}
