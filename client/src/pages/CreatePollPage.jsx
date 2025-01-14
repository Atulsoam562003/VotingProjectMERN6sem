import React from "react";
import { Navigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import CreatePoll from "../components/CreatePoll";

const CreatePollPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div>
      <ErrorMessage />
      <CreatePoll />
    </div>
  );
};

export default CreatePollPage;
