import { combineReducers } from "redux";
import app from "./application";

const rootReducer = combineReducers({
  data: app,
});

export default rootReducer;
