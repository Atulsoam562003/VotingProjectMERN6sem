import React from "react";
import { connect } from "react-redux";
import { useRef } from "react";
import { Pie, getElementAtEvent } from "react-chartjs-2";

import { vote } from "../store/actions";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const color = () => {
  return "#" + Math.random().toString(16).slice(2, 8);
};

const Poll = (props) => {
  // console.log(props);
  const { poll, vote } = props;
  const answers =
    poll.options &&
    poll.options.map((option) => (
      <button
        className="button"
        onClick={() => vote(poll._id, { answer: option.option })}
        key={option._id}
      >
        {option.option}
      </button>
    ));

  const data = poll.options && {
    labels: poll.options.map((option) => option.option), //array of objects in array of strings
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map((option) => color()),
        borderColor: "#323643",
        data: poll.options.map((option) => option.votes),
        borderWidth: 2,
        hoverOffset: 4,
        link: [
          "https://atulsoam562003.github.io/MyResume/",
          "https://www.chartjs.org/docs/latest/",
          "https://www.wikipedia.org/",
        ],
      },
    ],
  };

  const options = {};
  const chartRef = useRef();
  const onClick = (event) => {
    if (getElementAtEvent(chartRef.current, event)) {
      const datasetIndexNum = getElementAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
      window.open(data.datasets[datasetIndexNum].link[dataPoint], "_blank");
    }
  };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="button-center">{answers}</div>
      {poll.options && (
        <div className="pie">
          <Pie data={data} options={options} onClick={onClick} ref={chartRef} />
        </div>
      )}
    </div>
  );
};

export default connect(
  (store) => ({
    poll: store.currentPoll,
  }),
  { vote }
)(Poll);
