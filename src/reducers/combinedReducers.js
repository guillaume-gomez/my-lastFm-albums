import { combineReducers } from 'redux';
import lastFmReducer from "./lastFmReducer";

export default combineReducers({
  lastFm: lastFmReducer
});
