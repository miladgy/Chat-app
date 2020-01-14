import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

let socket;
let ENDPOINT = "localhost:5000";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io("ENDPOINT");
    setName(name);
    socket.emit("signin", { name });
  }, [ENDPOINT, location.search]);
  return (
    <div className="chatOuterContainer">
      <div className="chatInnerContainer"></div>
    </div>
  );
};

export default Chat;
