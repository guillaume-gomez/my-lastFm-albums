import { albumInfosActions } from "../constants";
import { snakeCase } from "lodash";
import { ImageType } from "../Interfaces";

export interface AlbumInfo {
  artist: string;
  image: [ImageType, ImageType, ImageType, ImageType, ImageType, ImageType];
  name: string;
  mbid: string;
  userplaycount: number;
}

interface albumInterface {
  [key: string]: AlbumInfo
}


export interface AlbumsInfoState {
  albums: albumInterface;
  error: string| null;
}

const initialState = {
  albums: {},
  error: null
}

export default function(state : AlbumsInfoState = initialState, action: any) {
  const { type } = action;
  switch(type) {
    case albumInfosActions.FETCH_ALBUMS_INFOS_SUCCESS:
      const { albums } = state;
      const { album } = action;
      const key : string = albumKey(album.name, album.artist);
      return { albums: {...albums, [key]: album }, error: null }
    case albumInfosActions.FETCH_ALBUMS_INFOS_ERRORS:
      return { ...state, error: action.message };
    default:
      return state;
  }
};

export function albumKey(albumName: string, albumArtist: string) : string {
  return snakeCase(`${albumName}_${albumArtist}`)
}