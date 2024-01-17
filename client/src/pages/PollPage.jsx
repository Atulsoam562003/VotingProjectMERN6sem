import React, { useEffect } from "react";

import Poll from "../components/Poll";
import ErrorMessage from "../components/ErrorMessage";
import { useParams } from "react-router-dom";

const PollPage = (props) => {
  const { getPoll, getCurrentPoll } = props;
  const { id } = useParams();
  // useEffect(() => {
  getCurrentPoll(id);
  // }, [getPoll, id]);
  // console.log(props);
  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default PollPage;
