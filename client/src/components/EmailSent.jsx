// EmailSent.js

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class EmailSent extends Component {
  render() {
    const { successMessage } = this.props;

    return (
      <Fragment>
        {successMessage && <div className="success">{successMessage}</div>}
        {/* Your other component content */}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  successMessage: state.success,
});

export default connect(mapStateToProps)(EmailSent);
