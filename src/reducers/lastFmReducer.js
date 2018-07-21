import { lastFmActions } from "../constants";

const initialState = {
  data: null,
  error: null
}

export default function(state = initialState, action) {
  const { type } = action;
  switch(type) {
    case lastFmActions.FETCH_LAST_FM_SUCCESS:
      return { data: action.payload, error: null }
    case lastFmActions.FETCH_LAST_FM_ERRORS:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};
