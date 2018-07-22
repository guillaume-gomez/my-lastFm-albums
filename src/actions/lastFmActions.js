import { lastFmActions, userActions, albumInfosActions } from "../constants";

export function lasfmQueryWeekAlbum(user, from = null, to = null) {
  return {
    type: lastFmActions.FETCH_LAST_FM,
    user,
    from,
    to
  };
};

export function lastFmWeekAlbum(data) {
  return {
    type: lastFmActions.FETCH_LAST_FM_SUCCESS,
    payload: data.album,
    from: data["@attr"].from,
    to: data["@attr"].to
  };
}

export function lastFmWeekAlbumError(message) {
  return {
    type: lastFmActions.FETCH_LAST_FM_ERRORS,
    message
  };
}

export function fetchUser(user) {
  return {
    type: userActions.FETCH_USER_DATA,
    user
  };
}

export function fetchUserSuccess(user) {
  return {
    type: userActions.FETCH_USER_DATA_SUCCESS,
    user
  };
}

export function fetchUserError(message) {
  return {
    type: userActions.FETCH_USER_DATA_ERRORS,
    message
  };
}

export function fetchAlbumInfos(user, album) {
  return {
    type: albumInfosActions.FETCH_ALBUMS_INFOS,
    album,
    user
  };
}

export function fetchAlbumInfosSuccess(result) {
  return {
    type: albumInfosActions.FETCH_ALBUMS_INFOS_SUCCESS,
    result
  };
}

export function fetchAlbumInfosError(message) {
  return {
    type: albumInfosActions.FETCH_ALBUMS_INFOS_ERRORS,
    message
  };
}