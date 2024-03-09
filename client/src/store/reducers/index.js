import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import { polls, currentPoll } from "./polls";
import success from "./success";

export default combineReducers({
  error,
  auth,
  polls,
  currentPoll,
  success,
});
