import React from "react";
import "./Message.css";

const Message = ({message: {user, text}, name}) => {
    let isSentByExistingUser = false;
    const userName = name.trim().toLowerCase();
    if (user === userName) {
        isSentByExistingUser = true;
    }
  
return (
    isSentByExistingUser
    ? (
    <div className="mainMessageContainer flexEnd">
          <p className="messageSentBy pad-right">
          {userName}
          </p>
        <div className="messageBox darkBackground">
          <p className="messageBody fontColorWhite">
            {text}
          </p>
        </div>
    </div>
    )
    : (
    <div className="mainMessageContainer flexStart">
        
      <div className="messageBox brightBackground">
        <p className="messageBody fontColorDark">
          {text}
        </p>
      </div>
        <p className="messageSentBy pad-left">
        {user}
        </p>
    </div>
    )

)
    };

export default Message;