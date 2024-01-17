import React from "react";
import { connect } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getCurrentPoll } from "../store/actions";

import AuthPage from "../pages/AuthPage";
import TestPage from "../pages/TestPage";
import HomePage from "../pages/HomePage";
import PollPage from "../pages/PollPage";
import CreatePollPage from "../pages/CreatePollPage";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const RouteViews = (props) => {
  const { auth } = props;
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<HomePage {...props} />} />
        <Route
          exact
          path="/login"
          element={
            <AuthPage
              AuthPageType="login"
              isAuthenticated={auth?.isAuthenticated}
            />
          }
        />
        <Route
          exact
          path="/register"
          element={
            <AuthPage
              AuthPageType="register"
              isAuthenticated={auth?.isAuthenticated}
            />
          }
        />
        <Route
          exact
          path="/poll/new"
          element={<CreatePollPage isAuthenticated={auth.isAuthenticated} />}
        />
        <Route
          exact
          path="/poll/:id"
          element={<PollPage getPoll={(id) => getCurrentPoll(id)} {...props} />}
        />
        <Route exact path="/test" element={<TestPage />} />
      </Routes>
    </main>
  );
};

export default withRouter(
  connect((store) => ({ auth: store.auth }), { getCurrentPoll })(RouteViews)
);
