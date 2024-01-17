import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Auth from "../components/Auth";
import CreatePoll from "../components/CreatePoll";
import ErrorMessage from "../components/ErrorMessage";
import Poll from "../components/Poll";
import Polls from "../components/Polls";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
const TestPage = () => {
  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default TestPage;
