import React from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage";
import Polls from "../components/Polls";

const HomePage = ({ props }) => {
  // const { isAuthenticated } = props;
  const navigate = useNavigate();
  return (
    <div className="main">
      {/* <ErrorMessage /> */}
      <video autoPlay loop muted playsInline className="bg__video nightowl">
        <source
          src={require("../styles/assets/Untitled design.mp4")}
          type="video/mp4"
        />
      </video>
      <div className="content">
        <h1>
          IIITG<span> Voting</span> <span>App</span>
        </h1>
        <p>
          {" "}
          Empowering voices, shaping tomorrow. Welcome to Indian Institute of
          Information Technology , Guwahati Voting Platform.
        </p>
        <div className="promo" onClick={() => navigate("/register")}>
          <strong>Register Here</strong>
        </div>
      </div>
      {/* <Polls {...props} /> */}
    </div>
  );
};

export default HomePage;
