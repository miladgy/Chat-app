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
          >Feedback goes here
          </p>
        </div>
      <Link onClick={event => (!name)? event.preventDefault() : null} to={`/chat?name=${name}`}>
        <button className="signInBtn btn" type="submit"><svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
        </svg><span>ENTER CHAT</span></button>
      </Link>
      </div>
    </div>
  );
};

export default LandingPage;
