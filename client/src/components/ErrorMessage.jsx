import React, { Fragment } from "react";
import { connect } from "react-redux";

const ErrorMessage = ({ error, authType }) => (
  <Fragment>
    {error.message ? (
      <div className="error">{error.message}</div>
    ) : authType === "register" ? (
      <div className="success">
        If there are no errors after submitting check you respected EmailID
      </div>
    ) : (
      <div></div>
    )}
  </Fragment>
);

export default connect((store) => ({ error: store.error }))(ErrorMessage);
