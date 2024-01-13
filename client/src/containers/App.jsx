import React from "react";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { store } from "../store";
import { addError, setCurrentUser, setToken } from "../store/actions";
import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage";

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}
const App = () => (
  <Provider store={store}>
    <Auth authType={"login"} />
    <ErrorMessage />
  </Provider>
);
export default App;
