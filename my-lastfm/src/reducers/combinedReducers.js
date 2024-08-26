import { combineReducers } from 'redux';
import lastFmReducer from "./lastFmReducer";
import userReducer from "./userReducer";
import albumInfosReducer from "./albumInfosReducer";

export default combineReducers({
  lastFm: lastFmReducer,
  user: userReducer,
  albumsInfos: albumInfosReducer
});
