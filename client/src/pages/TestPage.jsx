import React from "react";
import Poll from "../components/Poll";
import ErrorMessage from "../components/ErrorMessage";

const TestPage = () => {
  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default TestPage;
