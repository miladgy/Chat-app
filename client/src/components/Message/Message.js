import React from "react";
import ReactEmoji from "react-emoji"
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
            {ReactEmoji.emojify(text)}
          </p>
        </div>
    </div>
    )
    : (
    <div className="mainMessageContainer flexStart">
        
      <div className="messageBox brightBackground">
        <p className="messageBody fontColorDark">
          {ReactEmoji.emojify(text)}
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