import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPolls, getUserPolls, getCurrentPoll } from "../store/actions";
import { Navigate, useNavigate } from "react-router-dom";

const Polls = (props) => {
  const { auth, polls, getPolls, getUserPolls } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/" if auth.isAuthenticated is false
    if (!auth.isAuthenticated) {
      navigate("/");
    } else {
      getPolls();
    }
  }, [auth.isAuthenticated, navigate, getPolls]);

  const handleSelect = (id) => {
    navigate(`/poll/${id}`);
  };

  const pollList = polls.map((poll) => (
    <li key={poll._id} onClick={() => handleSelect(poll._id)}>
      {poll.question}
    </li>
  ));

  return (
    <div>
      {auth.isAuthenticated && (
        <div className="button-center">
          <button className="button" onClick={getPolls}>
            All polls
          </button>
          <button className="button" onClick={getUserPolls}>
            My polls
          </button>
        </div>
      )}
      <ul className="polls">{pollList}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  polls: state.polls,
});

export default connect(mapStateToProps, {
  getPolls,
  getUserPolls,
  getCurrentPoll,
})(Polls);
