import { combineReducers } from 'redux';
import lastFmReducer from "./lastFmReducer";
import userReducer from "./userReducer";

export default combineReducers({
  lastFm: lastFmReducer,
  user: userReducer
});
