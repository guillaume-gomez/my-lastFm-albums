import { lastFmActions } from "../constants";

export function lasfmQuery() {
  return {
    type: lastFmActions.FETCH_LAST_FM
  };
};

export function lastFmResult() {
  return {
    type: lastFmActions.FETCH_LAST_FM_SUCCESS
  };
}

export function lastFmError(message) {
  return {
    type: lastFmActions.FETCH_LAST_FM_ERRORS,
    message
  };
}