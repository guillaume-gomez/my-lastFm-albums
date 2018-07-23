import { albumInfosActions } from "../constants";

const initialState = {
  albums: [],
  error: null
}

export default function(state = initialState, action) {
  const { type } = action;
  switch(type) {
    case albumInfosActions.FETCH_ALBUMS_INFOS_SUCCESS:
      const { album } = action;
      //check if album is already here
      const albums = state.albums.slice();
      albums.push(album);
      return { albums, error: null }
    case albumInfosActions.FETCH_ALBUMS_INFOS_ERRORS:
      return Object.assign({}, state, { error: action.message });
    default:
      return state;
  }
};
