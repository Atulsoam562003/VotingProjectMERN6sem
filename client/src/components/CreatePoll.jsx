import React, { useState } from "react";
import { connect } from "react-redux";
import { createPoll } from "../store/actions";
import { useNavigate } from "react-router-dom";

const CreatePoll = ({ createPoll }) => {
  const [state, setState] = useState({
    question: "",
    options: [""],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const addAnswer = () => {
    setState({ ...state, options: [...state.options, ""] });
  };

  const handleAnswer = (e, index) => {
    const options = [...state.options];
    options[index] = e.target.value;
    setState({ ...state, options: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPoll(state)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const options = state.options.map((options, i) => (
    <React.Fragment key={i}>
      <label className="form-label">option</label>
      <input
        className="form-input"
        type="text"
        value={options}
        onChange={(e) => handleAnswer(e, i)}
      />
    </React.Fragment>
  ));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="question">
        Question
      </label>
      <input
        className="form-input"
        type="text"
        name="question"
        value={state.question}
        onChange={handleChange}
      />

      {options}
      <div className="button-center">
        <button className="button" type="button" onClick={addAnswer}>
          Add options
        </button>
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default connect(null, { createPoll })(CreatePoll);
