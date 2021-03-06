import { lastFmActions } from "../constants";

const initialState = {
  data: [],
  error: null
}

export default function(state = initialState, action) {
  const { type } = action;
  switch(type) {
    case lastFmActions.FETCH_LAST_FM_SUCCESS:
      const { from, to, payload} = action;
      const newChunk = { payload, from, to};
      return { data: [...state.data, newChunk], error: null }
    case lastFmActions.FETCH_LAST_FM_ERRORS:
      return Object.assign({}, state, { error: action.message });
    default:
      return state;
  }
};
