import { lastFmActions, userActions, albumInfosActions } from "../constants";

export function lasfmQueryWeeksAlbum(user: string, weeks: any) {
  return {
    type: lastFmActions.FETCH_LAST_FM_WEEKS,
    user,
    weeks
  };
};

export function lasfmQueryWeekAlbum(user: string, from?: string, to?: string) {
  return {
    type: lastFmActions.FETCH_LAST_FM,
    user,
    from,
    to
  };
};

export function lastFmWeekAlbum(data: any) {
  return {
    type: lastFmActions.FETCH_LAST_FM_SUCCESS,
    payload: data.album,
    from: data["@attr"].from,
    to: data["@attr"].to
  };
}

export function lastFmWeekAlbumError(message: string) {
  return {
    type: lastFmActions.FETCH_LAST_FM_ERRORS,
    message
  };
}

export function fetchUser(user: string) {
  return {
    type: userActions.FETCH_USER_DATA,
    user
  };
}

export function fetchUserSuccess(user: string) {
  return {
    type: userActions.FETCH_USER_DATA_SUCCESS,
    user
  };
}

export function fetchUserError(message: string) {
  return {
    type: userActions.FETCH_USER_DATA_ERRORS,
    message
  };
}

export function fetchAlbumInfos(user: string, album: any) {
  return {
    type: albumInfosActions.FETCH_ALBUMS_INFOS,
    album,
    user
  };
}

export function fetchAlbumInfosSuccess(album: any) {
  return {
    type: albumInfosActions.FETCH_ALBUMS_INFOS_SUCCESS,
    album
  };
}

export function fetchAlbumInfosError(message: string) {
  return {
    type: albumInfosActions.FETCH_ALBUMS_INFOS_ERRORS,
    message
  };
}