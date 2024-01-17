import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { store } from "../store";
import { addError, setCurrentUser, setToken } from "../store/actions";
import RouteViews from "./RouteViews";
import Navbar from "./Navbar";

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
    <Router>
      <Fragment>
        <Navbar />
        <RouteViews />
      </Fragment>
    </Router>
  </Provider>
);
export default App;
