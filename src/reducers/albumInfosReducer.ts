import { albumInfosActions } from "../constants";
import { ImageType } from "../Interfaces";

export interface AlbumInfo {
  artist: string;
  image: [ImageType, ImageType, ImageType, ImageType, ImageType, ImageType];
  name: string;
  mbid: string;
  userplaycount: number;
}


export interface AlbumsInfoState {
  albums: AlbumInfo[];
  error: string| null;
}

const initialState = {
  albums: [],
  error: null
}

export default function(state : AlbumsInfoState = initialState, action: any) {
  const { type } = action;
  switch(type) {
    case albumInfosActions.FETCH_ALBUMS_INFOS_SUCCESS:
      const { album } = action;
      return { albums: [...state.albums, album], error: null }
    case albumInfosActions.FETCH_ALBUMS_INFOS_ERRORS:
      return { ...state, error: action.message };
    default:
      return state;
  }
};
