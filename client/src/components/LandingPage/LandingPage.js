import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

const LandingPage = () => {
  const [name, setName] = useState("");
  const inputStyle = {
    color: "blue"
  };

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <h1 className="heading">Join Chat!</h1>
        <div>
          <input
            type="text"
            className="LandingPageJoin"
            placeholder=""
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p 
            for="feedback"
            className="LandingPageJoin"
            style={inputStyle}
          >Feedback goes here</p>
        </div>
      </div>
      <Link onClick={event => (!name)? event.preventDefault() : null} to={`/chat?name=${name}`}>
        <button className="signInBtn btn" type="submit">Sign in</button>
      </Link>
    </div>
  );
};

export default LandingPage;
