import api from "../../services/api";
import { SET_POLLS, SET_CURRENT_POLL } from "../actionTypes";
import { addError, removeError } from "./error";

export const setPolls = (polls) => ({
  type: SET_POLLS,
  polls,
});

export const setCurrentPoll = (poll) => ({
  type: SET_CURRENT_POLL,
  poll,
});

//action creators === thunks (which returns function)
export const getPolls = () => {
  return async (dispatch) => {
    try {
      const polls = await api.call("get", "polls"); // (request , route)
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getUserPolls = () => {
  return async (dispatch) => {
    try {
      const polls = await api.call("get", "polls/user");
      dispatch(setPolls(polls));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const createPoll = (data) => {
  return async (dispatch) => {
    try {
      const poll = await api.call("post", "polls", data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const getCurrentPoll = (path) => {
  return async (dispatch) => {
    try {
      const poll = await api.call("get", `polls/${path}`);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};

export const vote = (path, data) => {
  return async (dispatch) => {
    try {
      const poll = await api.call("post", `polls/${path}`, data);
      dispatch(setCurrentPoll(poll));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
    }
  };
};
