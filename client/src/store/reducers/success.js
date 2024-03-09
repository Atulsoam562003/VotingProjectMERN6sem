import { ADD_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE } from "../actionTypes";

export default (state = "", action) => {
  switch (action.type) {
    case ADD_SUCCESS_MESSAGE:
      return action.message;
    case REMOVE_SUCCESS_MESSAGE:
      return "";
    default:
      return state;
  }
};
