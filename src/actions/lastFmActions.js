import { lastFmActions, userActions } from "../constants";

export function lasfmQuery(user, from = null, to = null) {
  return {
    type: lastFmActions.FETCH_LAST_FM,
    user,
    from,
    to
  };
};

export function lastFmResult(data) {
  return {
    type: lastFmActions.FETCH_LAST_FM_SUCCESS,
    payload: data.weeklyalbumchart.album,
    from: data.weeklyalbumchart["@attr"].from,
    to: data.weeklyalbumchart["@attr"].to
  };
}

export function lastFmError(message) {
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