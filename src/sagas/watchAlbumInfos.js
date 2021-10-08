import { put } from 'redux-saga/effects';

import { fetchAlbumInfosSuccess, fetchAlbumInfosError} from '../actions/lastFmActions';

const api_key = process.env.REACT_APP_API_KEY;

export function* lastFmAlbumInfosQuery(params) {
    try {
      const { user, album } = params;
      const userEncoded = encodeURIComponent(user);
      const artistEncoded = encodeURIComponent(album.artist["#text"]);
      const nameEncoded = encodeURIComponent(album.name);
      
      let url = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&user=${userEncoded}&api_key=${api_key}&artist=${artistEncoded}&album=${nameEncoded}&format=json`;
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
    } catch(e) {
      yield put(fetchAlbumInfosError(e.message));
    }
}
