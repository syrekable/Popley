import { combineReducers } from "redux";
import plants from './plants';
import notifications from './notifications';

export default combineReducers({
  plants,
  notifications
})