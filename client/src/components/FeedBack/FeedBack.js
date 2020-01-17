import React  from "react";
import "./FeedBack.css"




const FeedBack = ({text}) => {
   

  const inputStyle = {
    color: "blue"
  };

  return (
       
        <div>
          <p 
            for="feedback"
            className="LandingPageJoin"
            style={inputStyle}
          >{text}
          </p>
        </div>
  );
};

export default FeedBack;
