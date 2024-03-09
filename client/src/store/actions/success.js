import { ADD_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE } from "../actionTypes";

export const addSuccessMessage = (message) => ({
  type: ADD_SUCCESS_MESSAGE,
  message,
});

export const removeSuccessMessage = () => ({
  type: REMOVE_SUCCESS_MESSAGE,
});
