import { lastFmActions } from "../constants";

export interface payloadInterface {
  "@attr": {
    rank: string;
  }
  artist: {
    mbid: string;
    "#text": string
  }
  mbid: string;
  name: string;
  playcount: string;
  url: string;
}

export interface chunkInterface {
  from: string;
  to: string;
  payload: payloadInterface[];
}

export interface LastFmReducerInterface {
  data: chunkInterface[];
  error: string | null;
}

const initialState = {
  data: [],
  error: null
}

export default function(state: LastFmReducerInterface = initialState, action: any) {
  const { type } = action;
  switch(type) {
    case lastFmActions.FETCH_LAST_FM_SUCCESS:
      const { from, to, payload} = action;
      const newChunk = { payload, from, to };
      return { data: [...state.data, newChunk], error: null }
    case lastFmActions.FETCH_LAST_FM_ERRORS:
      return { ...state, error: action.message };
    default:
      return state;
  }
};
